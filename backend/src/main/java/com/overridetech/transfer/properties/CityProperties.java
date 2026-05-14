package com.overridetech.transfer.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;

@Data
@ConfigurationProperties(prefix = "european")
public class CityProperties {
    List<City> cities;

    @Data
    public static class City {
        String ru;
        String lat;
    }
}
