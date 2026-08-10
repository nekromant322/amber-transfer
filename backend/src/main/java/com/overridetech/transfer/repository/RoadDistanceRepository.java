package com.overridetech.transfer.repository;

import com.overridetech.transfer.model.RoadDistance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoadDistanceRepository extends JpaRepository<RoadDistance, Long> {

    Optional<RoadDistance> findByCityFromAndCityTo(String cityFrom, String cityTo);
}
