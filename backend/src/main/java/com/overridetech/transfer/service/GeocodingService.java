package com.overridetech.transfer.service;

import com.overridetech.transfer.exceptions.CityNotFoundException;
import com.overridetech.transfer.model.CityCoordinates;
import com.overridetech.transfer.repository.CityCoordinatesRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
public class GeocodingService {

    private static final String NOMINATIM_URL = "https://nominatim.openstreetmap.org";

    private final CityCoordinatesRepository repository;
    private final RestClient restClient;
    // In-memory read-through cache in front of city_coordinates - avoids a DB round trip
    // for every request once a process has already looked a city up.
    private final Map<String, double[]> coordinatesCache = new ConcurrentHashMap<>();

    public GeocodingService(CityCoordinatesRepository repository) {
        this.repository = repository;
        this.restClient = RestClient.builder()
                .baseUrl(NOMINATIM_URL)
                .defaultHeader("User-Agent", "overridetech-transfer-app")
                .build();
    }

    public double[] getCoordinates(String city) {
        String key = city.trim().toLowerCase();

        double[] cached = coordinatesCache.get(key);
        if (cached != null) {
            return cached;
        }

        Optional<CityCoordinates> stored = repository.findById(key);
        if (stored.isPresent()) {
            double[] coordinates = {stored.get().getLatitude(), stored.get().getLongitude()};
            coordinatesCache.put(key, coordinates);
            return coordinates;
        }

        double[] coordinates = fetchFromNominatim(city);
        coordinatesCache.put(key, coordinates);
        persist(key, coordinates);
        return coordinates;
    }

    private double[] fetchFromNominatim(String city) {
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

    private void persist(String key, double[] coordinates) {
        try {
            repository.save(new CityCoordinates(key, coordinates[0], coordinates[1]));
        } catch (DataIntegrityViolationException e) {
            // Another request geocoded and saved the same city concurrently - fine, it's cached in memory now anyway.
            log.debug("City coordinates for '{}' already persisted by a concurrent request", key);
        }
    }

    record NominatimResult(String lat, String lon) {}
}
