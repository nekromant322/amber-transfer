package com.overridetech.transfer.pricing;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Component
public class PriceRegistry {

    private final Map<String, Integer> routePrices = new ConcurrentHashMap<>();
    private final Map<String, Integer> customsPrices = new ConcurrentHashMap<>();
    private final RestClient restClient = RestClient.create();

    @Value("${google.sheets.api-key}")
    private String apiKey;

    @Value("${google.sheets.spreadsheet-id}")
    private String spreadsheetId;

    @PostConstruct
    @Scheduled(fixedDelay = 3_600_000)
    public void refresh() {
        routePrices.putAll(fetchSheet("price routes"));
        customsPrices.putAll(fetchSheet("tamojnya base price"));
        log.info("Price registry refreshed: {} routes, {} customs entries",
                routePrices.size(), customsPrices.size());
    }

    public Optional<Integer> getPrice(String from, String to) {
        return lookup(routePrices, from, to);
    }

    public Optional<Integer> getCustomsPrice(String from, String to) {
        return lookup(customsPrices, from, to);
    }

    private Optional<Integer> lookup(Map<String, Integer> map, String from, String to) {
        Integer price = map.get(key(from, to));
        if (price == null) price = map.get(key(to, from));
        return Optional.ofNullable(price);
    }

    private Map<String, Integer> fetchSheet(String sheetName) {
        try {
            String url = "https://sheets.googleapis.com/v4/spreadsheets/{id}/values/{range}?key={key}";
            String range = "'" + sheetName + "'!A:C";

            Map<?, ?> response = restClient.get()
                    .uri(url, spreadsheetId, range, apiKey)
                    .retrieve()
                    .body(Map.class);

            if (response == null || !response.containsKey("values")) {
                log.warn("Sheet '{}': empty response", sheetName);
                return Map.of();
            }

            Map<String, Integer> result = new ConcurrentHashMap<>();
            for (Object rowObj : (List<?>) response.get("values")) {
                List<?> row = (List<?>) rowObj;
                if (row.size() < 3) continue;
                String from = row.get(0).toString().trim();
                String to = row.get(1).toString().trim();
                try {
                    result.put(key(from, to), Integer.parseInt(row.get(2).toString().trim()));
                } catch (NumberFormatException e) {
                    log.warn("Sheet '{}': skipping invalid row: {} -> {}", sheetName, from, to);
                }
            }
            return result;
        } catch (Exception e) {
            log.error("Failed to fetch sheet '{}': {}", sheetName, e.getMessage());
            return Map.of();
        }
    }

    private String key(String from, String to) {
        return from.toLowerCase() + "|" + to.toLowerCase();
    }
}
