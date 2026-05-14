package com.overridetech.transfer.controller;

import com.overridetech.transfer.pricing.PriceRegistry;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/price")
@RequiredArgsConstructor
public class PriceController {

    private final PriceRegistry priceRegistry;

    @GetMapping
    public ResponseEntity<?> getPrice(
            @RequestParam String from,
            @RequestParam String to,
            @RequestParam(defaultValue = "eu") String passport
    ) {
        return priceRegistry.getPrice(from, to)
                .<ResponseEntity<?>>map(price -> ResponseEntity.ok(Map.of(
                        "from", from,
                        "to", to,
                        "passport", passport,
                        "price", price
                )))
                .orElse(ResponseEntity.notFound().build());
    }
}
