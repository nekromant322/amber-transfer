package com.overridetech.transfer.repository;

import com.overridetech.transfer.model.OrderNotification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderNotificationRepository extends JpaRepository<OrderNotification, Long> {

    List<OrderNotification> findAllByOrderId(Long orderId);
}
