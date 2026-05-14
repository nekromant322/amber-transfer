package com.overridetech.transfer.repository;

import com.overridetech.transfer.model.Subscriber;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SubscriberRepository extends JpaRepository<Subscriber, Long> {

    Optional<Subscriber> findByChatId(Long chatId);

    List<Subscriber> findAllByActiveTrue();
}
