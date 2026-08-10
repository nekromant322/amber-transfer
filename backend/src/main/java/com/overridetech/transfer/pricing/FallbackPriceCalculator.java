package com.overridetech.transfer.pricing;

import com.overridetech.transfer.service.DistanceService;
import com.overridetech.transfer.service.GeocodingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Estimates a price for Kaliningrad <-> city routes that aren't in the price sheet.
 * <p>
 * All routes cross one of two border checkpoints: Kybartai (open to any passport) or
 * Grzechotki (open to EU passports only). Whichever eligible checkpoint is geographically
 * closest to the destination is used. The base price to reach that checkpoint already lives in
 * the "tamojnya base price" sheet and includes border-crossing time
 * ({@link PriceRegistry#getCustomsPrice}). The rest of the trip is priced per km, using the
 * nearest already-priced city as a reference rate.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class FallbackPriceCalculator {

    private static final String KALININGRAD = "kaliningrad";
    // Must match the "from"/"to" spelling used in the "tamojnya base price" sheet rows.
    private static final String CORRIDOR_LITHUANIA = "kybartai";
    private static final String CORRIDOR_POLAND = "grzechotki";

    private final PriceRegistry priceRegistry;
    private final DistanceService distanceService;
    private final GeocodingService geocodingService;

    private final Map<String, Optional<Integer>> estimateCache = new ConcurrentHashMap<>();

    @Scheduled(fixedDelay = 3_600_000)
    public void clearCache() {
        estimateCache.clear();
    }

    public Optional<Integer> estimate(String from, String to, String passport) {
        String a = from.trim().toLowerCase();
        String b = to.trim().toLowerCase();

        String target;
        if (a.equals(KALININGRAD)) target = b;
        else if (b.equals(KALININGRAD)) target = a;
        else return Optional.empty(); // fallback only knows how to price Kaliningrad <-> X

        if (target.equals(KALININGRAD)) return Optional.empty();

        String cacheKey = target + "|" + passport.trim().toLowerCase();
        return estimateCache.computeIfAbsent(cacheKey, k -> computeEstimate(target, passport));
    }

    private Optional<Integer> computeEstimate(String target, String passport) {
        Set<String> eligibleCorridors = "eu".equalsIgnoreCase(passport)
                ? Set.of(CORRIDOR_LITHUANIA, CORRIDOR_POLAND)
                : Set.of(CORRIDOR_LITHUANIA);

        // Try whichever eligible border checkpoint is actually closest to the destination first -
        // that's the one a driver would really cross. Falling back to the other eligible corridor
        // only kicks in if the nearest one has no usable price data. We deliberately do NOT pick
        // whichever corridor's extrapolated arithmetic happens to be cheaper: over long distances
        // a favorable per-km rate from one reference city can make a geographically absurd detour
        // (e.g. Kaliningrad -> Grzechotki -> Tallinn) look cheaper than the sane route.
        for (String border : orderByProximityToTarget(target, eligibleCorridors)) {
            Integer price = estimateViaCorridor(target, border);
            if (price != null) {
                return Optional.of(price);
            }
        }
        return Optional.empty();
    }

    private List<String> orderByProximityToTarget(String target, Set<String> eligibleCorridors) {
        double[] targetCoords;
        try {
            targetCoords = geocodingService.getCoordinates(target);
        } catch (RuntimeException e) {
            return List.copyOf(eligibleCorridors); // let estimateViaCorridor report the geocoding failure
        }

        return eligibleCorridors.stream()
                .sorted(Comparator.comparingDouble(border -> {
                    try {
                        return haversineKm(targetCoords, geocodingService.getCoordinates(border));
                    } catch (RuntimeException e) {
                        return Double.MAX_VALUE;
                    }
                }))
                .toList();
    }

    private Integer estimateViaCorridor(String target, String border) {
        Integer customsBase = priceRegistry.getCustomsPrice(KALININGRAD, border).orElse(null);
        if (customsBase == null) {
            log.warn("No customs base price for Kaliningrad-{}, skipping corridor", border);
            return null;
        }

        double[] borderCoords;
        double[] targetCoords;
        double[] kaliningradCoords;
        try {
            borderCoords = geocodingService.getCoordinates(border);
            targetCoords = geocodingService.getCoordinates(target);
            kaliningradCoords = geocodingService.getCoordinates(KALININGRAD);
        } catch (RuntimeException e) {
            log.warn("Could not geocode '{}' or '{}': {}", border, target, e.getMessage());
            return null;
        }

        String otherBorder = border.equals(CORRIDOR_LITHUANIA) ? CORRIDOR_POLAND : CORRIDOR_LITHUANIA;
        double[] otherBorderCoords = null;
        try {
            otherBorderCoords = geocodingService.getCoordinates(otherBorder);
        } catch (RuntimeException e) {
            log.warn("Could not geocode other-corridor border '{}': {}", otherBorder, e.getMessage());
        }

        String referenceCity = findNearestPricedCity(target, targetCoords, border, borderCoords,
                otherBorderCoords, kaliningradCoords);
        if (referenceCity == null) {
            log.warn("No priced reference city found for corridor {}", border);
            return null;
        }

        Integer referencePrice = priceRegistry.getPrice(KALININGRAD, referenceCity).orElse(null);
        if (referencePrice == null) return null;

        try {
            double distBorderToReference = distanceService.calculateDistance(border, referenceCity);
            if (distBorderToReference < 1.0) return null; // too close to the border to derive a sane rate

            double ratePerKm = (referencePrice - customsBase) / distBorderToReference;
            double distBorderToTarget = distanceService.calculateDistance(border, target);

            double price = customsBase + ratePerKm * distBorderToTarget;
            return roundUpToTen(Math.max(price, customsBase));
        } catch (RuntimeException e) {
            log.warn("Distance calculation failed for corridor {}: {}", border, e.getMessage());
            return null;
        }
    }

    // Estimated prices (unlike sheet prices) round up to the nearest 10 - keeps quoted
    // numbers round and never undercuts the actual per-km rate.
    private static int roundUpToTen(double price) {
        return (int) (Math.ceil(price / 10.0) * 10);
    }

    /**
     * Nearest already-priced city to the target, restricted to cities that have actually
     * crossed this corridor's border. Two filters apply:
     * <ul>
     *     <li>domestic cities (still closer to Kaliningrad than the border checkpoint itself,
     *     e.g. other towns within the Kaliningrad region) are excluded - they were never priced
     *     with any customs/border cost baked in, so blending their price in would skew the rate;</li>
     *     <li>cities that are geographically on the other corridor's side (closer to the other
     *     border than to this one) are excluded too.</li>
     * </ul>
     * Uses straight-line distance on cached coordinates - cheap, and only needs to be roughly
     * right since it's just picking a reference point, not the final price.
     */
    private String findNearestPricedCity(String target, double[] targetCoords, String border, double[] borderCoords,
                                          double[] otherBorderCoords, double[] kaliningradCoords) {
        String nearest = null;
        double nearestDist = Double.MAX_VALUE;
        double borderDistFromKaliningrad = haversineKm(kaliningradCoords, borderCoords);

        for (String candidate : priceRegistry.destinationsFrom(KALININGRAD)) {
            if (candidate.equals(CORRIDOR_LITHUANIA) || candidate.equals(CORRIDOR_POLAND) || candidate.equals(target)) {
                continue;
            }

            double[] candidateCoords;
            try {
                candidateCoords = geocodingService.getCoordinates(candidate);
            } catch (RuntimeException e) {
                continue;
            }

            if (haversineKm(kaliningradCoords, candidateCoords) <= borderDistFromKaliningrad) {
                continue; // still on the Kaliningrad side of the checkpoint - not a cross-border price
            }

            if (otherBorderCoords != null) {
                double distToOwnBorder = haversineKm(candidateCoords, borderCoords);
                double distToOtherBorder = haversineKm(candidateCoords, otherBorderCoords);
                if (distToOwnBorder > distToOtherBorder) continue; // belongs to the other corridor
            }

            double distToTarget = haversineKm(candidateCoords, targetCoords);
            if (distToTarget < nearestDist) {
                nearestDist = distToTarget;
                nearest = candidate;
            }
        }
        return nearest;
    }

    private static double haversineKm(double[] p1, double[] p2) {
        double earthRadiusKm = 6371.0;
        double dLat = Math.toRadians(p2[0] - p1[0]);
        double dLon = Math.toRadians(p2[1] - p1[1]);
        double lat1 = Math.toRadians(p1[0]);
        double lat2 = Math.toRadians(p2[0]);

        double sinLat = Math.sin(dLat / 2);
        double sinLon = Math.sin(dLon / 2);
        double a = sinLat * sinLat + sinLon * sinLon * Math.cos(lat1) * Math.cos(lat2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return earthRadiusKm * c;
    }
}
