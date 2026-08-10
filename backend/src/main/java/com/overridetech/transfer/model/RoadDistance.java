package com.overridetech.transfer.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "road_distances", uniqueConstraints = @UniqueConstraint(columnNames = {"city_from", "city_to"}))
@Getter
@Setter
@NoArgsConstructor
public class RoadDistance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "city_from", nullable = false)
    private String cityFrom;

    @Column(name = "city_to", nullable = false)
    private String cityTo;

    @Column(name = "distance_km", nullable = false)
    private double distanceKm;

    public RoadDistance(String cityFrom, String cityTo, double distanceKm) {
        this.cityFrom = cityFrom;
        this.cityTo = cityTo;
        this.distanceKm = distanceKm;
    }
}
