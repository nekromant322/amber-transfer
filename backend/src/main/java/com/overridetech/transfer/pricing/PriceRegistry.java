package com.overridetech.transfer.pricing;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Component
public class PriceRegistry {

    private final Map<String, Integer> prices = new ConcurrentHashMap<>();
    private final RestClient restClient = RestClient.create();

    @Value("${google.sheets.prices-url}")
    private String pricesUrl;

    @PostConstruct
    @Scheduled(fixedDelay = 3_600_000)
    public void refresh() {
        try {
            String csv = restClient.get()
                    .uri(pricesUrl)
                    .retrieve()
                    .body(String.class);

            Map<String, Integer> updated = new ConcurrentHashMap<>();
            for (String line : csv.split("\\r?\\n")) {
                String[] cols = line.split(",");
                if (cols.length < 3) continue;
                String from = cols[0].trim();
                String to = cols[1].trim();
                String rawPrice = cols[2].trim();
                try {
                    updated.put(key(from, to), Integer.parseInt(rawPrice));
                } catch (NumberFormatException e) {
                    log.warn("Skipping invalid price row: {}", line);
                }
            }

            prices.clear();
            prices.putAll(updated);
            log.info("Price registry refreshed: {} routes loaded", prices.size());
        } catch (Exception e) {
            log.error("Failed to refresh price registry: {}", e.getMessage());
        }
    }

    public Optional<Integer> getPrice(String from, String to) {
        return Optional.ofNullable(prices.get(key(from, to)));
    }

    private String key(String from, String to) {
        return from.toLowerCase() + "|" + to.toLowerCase();
    }
}
