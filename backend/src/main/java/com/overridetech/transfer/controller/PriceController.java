package com.overridetech.transfer.controller;

import com.overridetech.transfer.pricing.FallbackPriceCalculator;
import com.overridetech.transfer.pricing.PriceRegistry;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/price")
@RequiredArgsConstructor
public class PriceController {

    private final PriceRegistry priceRegistry;
    private final FallbackPriceCalculator fallbackPriceCalculator;

    @GetMapping
    public ResponseEntity<?> getPrice(
            @RequestParam String from,
            @RequestParam String to,
            @RequestParam(defaultValue = "eu") String passport
    ) {
        Optional<Integer> exact = priceRegistry.getPrice(from, to);
        if (exact.isPresent()) {
            return ResponseEntity.ok(Map.of(
                    "from", from,
                    "to", to,
                    "passport", passport,
                    "price", exact.get()
            ));
        }

        return fallbackPriceCalculator.estimate(from, to, passport)
                .<ResponseEntity<?>>map(price -> ResponseEntity.ok(Map.of(
                        "from", from,
                        "to", to,
                        "passport", passport,
                        "price", price,
                        "estimated", true
                )))
                .orElse(ResponseEntity.notFound().build());
    }
}
