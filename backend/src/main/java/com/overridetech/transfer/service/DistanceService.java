package com.overridetech.transfer.service;

import com.overridetech.transfer.exceptions.RouteNotFoundException;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
public class DistanceService {

    private static final String OSRM_URL = "https://router.project-osrm.org";

    private final GeocodingService geocodingService;
    private final RestClient restClient;

    public DistanceService(GeocodingService geocodingService) {
        this.geocodingService = geocodingService;
        this.restClient = RestClient.builder()
                .baseUrl(OSRM_URL)
                .defaultHeader("User-Agent", "overridetech-transfer-app")
                .defaultHeader("Accept-Encoding", "identity")
                .build();
    }

    public double calculateDistance(String fromCity, String toCity) {
        double[] from = geocodingService.getCoordinates(fromCity);
        double[] to = geocodingService.getCoordinates(toCity);
        return getRoadDistanceKm(from[0], from[1], to[0], to[1]);
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
