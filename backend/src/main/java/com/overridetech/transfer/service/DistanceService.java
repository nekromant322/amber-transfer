package com.overridetech.transfer.service;

import com.overridetech.transfer.exceptions.RouteNotFoundException;
import com.overridetech.transfer.model.RoadDistance;
import com.overridetech.transfer.repository.RoadDistanceRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
public class DistanceService {

    private static final String OSRM_URL = "https://router.project-osrm.org";

    private final GeocodingService geocodingService;
    private final RoadDistanceRepository repository;
    private final RestClient restClient;
    // In-memory read-through cache in front of road_distances - avoids a DB round trip
    // for every request once a process has already looked a pair up.
    private final Map<String, Double> distanceCache = new ConcurrentHashMap<>();

    public DistanceService(GeocodingService geocodingService, RoadDistanceRepository repository) {
        this.geocodingService = geocodingService;
        this.repository = repository;
        this.restClient = RestClient.builder()
                .baseUrl(OSRM_URL)
                .defaultHeader("User-Agent", "overridetech-transfer-app")
                .defaultHeader("Accept-Encoding", "identity")
                .build();
    }

    public double calculateDistance(String fromCity, String toCity) {
        String a = fromCity.trim().toLowerCase();
        String b = toCity.trim().toLowerCase();
        String cityFrom = a.compareTo(b) <= 0 ? a : b;
        String cityTo = a.compareTo(b) <= 0 ? b : a;
        String key = cityFrom + "|" + cityTo;

        Double cached = distanceCache.get(key);
        if (cached != null) {
            return cached;
        }

        Optional<RoadDistance> stored = repository.findByCityFromAndCityTo(cityFrom, cityTo);
        if (stored.isPresent()) {
            double km = stored.get().getDistanceKm();
            distanceCache.put(key, km);
            return km;
        }

        double[] from = geocodingService.getCoordinates(fromCity);
        double[] to = geocodingService.getCoordinates(toCity);
        double km = getRoadDistanceKm(from[0], from[1], to[0], to[1]);
        distanceCache.put(key, km);
        persist(cityFrom, cityTo, km);
        return km;
    }

    private void persist(String cityFrom, String cityTo, double km) {
        try {
            repository.save(new RoadDistance(cityFrom, cityTo, km));
        } catch (DataIntegrityViolationException e) {
            // Another request computed and saved the same pair concurrently - fine, it's cached in memory now anyway.
            log.debug("Road distance for '{}'-'{}' already persisted by a concurrent request", cityFrom, cityTo);
        }
    }

    @SuppressWarnings("unchecked")
    private double getRoadDistanceKm(double lat1, double lon1, double lat2, double lon2) {
        // OSRM expects lon,lat order
        String coords = "%s,%s;%s,%s".formatted(lon1, lat1, lon2, lat2);

        Map<String, Object> response = restClient.get()
                .uri("/route/v1/driving/{coords}?overview=false", coords)
                .retrieve()
                .body(new ParameterizedTypeReference<>() {});

        if (response == null || !"Ok".equals(response.get("code"))) {
            throw new RouteNotFoundException("OSRM returned error: " +
                    (response != null ? response.get("message") : "no response"));
        }

        List<Map<String, Object>> routes = (List<Map<String, Object>>) response.get("routes");
        if (routes == null || routes.isEmpty()) {
            throw new RouteNotFoundException("No driving route found between the cities");
        }

        // distance is in meters
        Number distanceMeters = (Number) routes.getFirst().get("distance");
        return distanceMeters.doubleValue() / 1000.0;
    }
}
