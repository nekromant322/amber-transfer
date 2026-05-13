package com.overridetech.transfer.service;

import com.overridetech.transfer.exceptions.CityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
public class GeocodingService {

    private static final String NOMINATIM_URL = "https://nominatim.openstreetmap.org";

    private final RestClient restClient;

    public GeocodingService() {
        this.restClient = RestClient.builder()
                .baseUrl(NOMINATIM_URL)
                .defaultHeader("User-Agent", "overridetech-transfer-app")
                .build();
    }

    public double[] getCoordinates(String city) {
        List<NominatimResult> results = restClient.get()
                .uri("/search?q={city}&format=json&limit=1", city)
                .retrieve()
                .body(new org.springframework.core.ParameterizedTypeReference<>() {});

        if (results == null || results.isEmpty()) {
            throw new CityNotFoundException(city);
        }

        NominatimResult result = results.getFirst();
        return new double[]{Double.parseDouble(result.lat()), Double.parseDouble(result.lon())};
    }

    record NominatimResult(String lat, String lon) {}
}
