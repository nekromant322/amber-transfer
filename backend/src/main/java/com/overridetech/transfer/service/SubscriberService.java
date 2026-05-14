package com.overridetech.transfer.service;

import com.overridetech.transfer.model.Subscriber;
import com.overridetech.transfer.repository.SubscriberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SubscriberService {

    private final SubscriberRepository subscriberRepository;

    @Transactional
    public boolean subscribe(Long chatId, String username, String firstName) {
        return subscriberRepository.findByChatId(chatId)
                .map(existing -> {
                    if (existing.isActive()) return false;
                    existing.setActive(true);
                    return true;
                })
                .orElseGet(() -> {
                    subscriberRepository.save(new Subscriber(chatId, username, firstName));
                    return true;
                });
    }

    @Transactional
    public boolean unsubscribe(Long chatId) {
        return subscriberRepository.findByChatId(chatId)
                .map(existing -> {
                    if (!existing.isActive()) return false;
                    existing.setActive(false);
                    return true;
                })
                .orElse(false);
    }
}