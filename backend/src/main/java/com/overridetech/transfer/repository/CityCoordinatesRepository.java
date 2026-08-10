package com.overridetech.transfer.repository;

import com.overridetech.transfer.model.CityCoordinates;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityCoordinatesRepository extends JpaRepository<CityCoordinates, String> {
}
