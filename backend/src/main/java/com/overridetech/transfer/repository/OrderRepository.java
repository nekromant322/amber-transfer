package com.overridetech.transfer.repository;

import com.overridetech.transfer.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
