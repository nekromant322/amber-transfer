package com.overridetech.transfer.controller;

import com.overridetech.transfer.properties.CityProperties;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/cities")
public class CityController {

    private final CityProperties cityProperties;

    public CityController(CityProperties cityProperties) {
        this.cityProperties = cityProperties;
    }

    @GetMapping
    public List<CityProperties.City> getCities() {
        return cityProperties.getCities();
    }
}
