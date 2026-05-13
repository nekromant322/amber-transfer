package com.overridetech.transfer.controller;

import com.overridetech.transfer.exceptions.CityNotFoundException;
import com.overridetech.transfer.exceptions.RouteNotFoundException;
import com.overridetech.transfer.service.DistanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/distance")
public class DistanceController {

    private final DistanceService distanceService;

    public DistanceController(DistanceService distanceService) {
        this.distanceService = distanceService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getDistance(
            @RequestParam String from,
            @RequestParam String to) {
        double km = distanceService.calculateDistance(from, to);
        return ResponseEntity.ok(Map.of(
                "from", from,
                "to", to,
                "distanceKm", Math.round(km * 10.0) / 10.0
        ));
    }

    @ExceptionHandler({CityNotFoundException.class, RouteNotFoundException.class})
    public ResponseEntity<Map<String, String>> handleErrors(RuntimeException ex) {
        return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
    }
}
