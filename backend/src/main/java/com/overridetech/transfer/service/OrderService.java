package com.overridetech.transfer.service;

import com.overridetech.transfer.dto.CreateOrderRequest;
import com.overridetech.transfer.model.Order;
import com.overridetech.transfer.model.Subscriber;
import com.overridetech.transfer.repository.OrderRepository;
import com.overridetech.transfer.repository.SubscriberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import com.overridetech.transfer.bot.TransferBot;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final SubscriberRepository subscriberRepository;
    private final TransferBot transferBot;

    private static final DateTimeFormatter DATE_FMT = DateTimeFormatter.ofPattern("dd.MM.yyyy");

    @Transactional
    public Order createOrder(CreateOrderRequest req) {
        if (req.date().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Дата поездки не может быть в прошлом");
        }

        Order order = new Order(req.from(), req.to(), req.date(), req.passport(), req.phone());
        orderRepository.save(order);

        notifyDrivers(order);
        return order;
    }

    private void notifyDrivers(Order order) {
        List<Subscriber> drivers = subscriberRepository.findAllByActiveTrue();
        if (drivers.isEmpty()) return;

        String passport = "eu".equalsIgnoreCase(order.getPassportType()) ? "ЕС" : "Другой";
        String text = """
                🚗 Новый заказ #%d

                📍 Откуда: %s
                🏁 Куда: %s
                📅 Дата: %s
                🪪 Паспорт: %s
                """.formatted(
                order.getId(),
                order.getFromCity(),
                order.getToCity(),
                order.getDate().format(DATE_FMT),
                passport
        );

        for (Subscriber driver : drivers) {
            try {
                transferBot.execute(SendMessage.builder()
                        .chatId(driver.getChatId())
                        .text(text)
                        .build());
            } catch (TelegramApiException e) {
                log.error("Failed to notify driver {}: {}", driver.getChatId(), e.getMessage());
            }
        }
    }
}
