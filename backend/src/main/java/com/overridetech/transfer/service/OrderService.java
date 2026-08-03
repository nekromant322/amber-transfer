package com.overridetech.transfer.service;

import com.overridetech.transfer.bot.TransferBot;
import com.overridetech.transfer.dto.CreateOrderRequest;
import com.overridetech.transfer.model.Order;
import com.overridetech.transfer.model.OrderNotification;
import com.overridetech.transfer.model.Subscriber;
import com.overridetech.transfer.repository.OrderNotificationRepository;
import com.overridetech.transfer.repository.OrderRepository;
import com.overridetech.transfer.repository.SubscriberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.methods.updatingmessages.EditMessageReplyMarkup;
import org.telegram.telegrambots.meta.api.objects.Message;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.InlineKeyboardMarkup;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.InlineKeyboardButton;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final SubscriberRepository subscriberRepository;
    private final OrderNotificationRepository notificationRepository;
    private final TransferBot transferBot;

    private static final DateTimeFormatter DATE_FMT = DateTimeFormatter.ofPattern("dd.MM.yyyy");

    @Transactional
    public Order createOrder(CreateOrderRequest req) {
        if (req.date().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Дата поездки не может быть в прошлом");
        }
        Order order = new Order(req.from(), req.to(), req.date(), req.passport(), req.phone(), req.price());
        orderRepository.save(order);
        notifyDrivers(order);
        return order;
    }

    @Transactional
    public void takeOrder(long orderId, long takerChatId) {
        List<OrderNotification> notifications = notificationRepository.findAllByOrderId(orderId);
        if (notifications.isEmpty()) return;

        boolean alreadyTaken = notifications.stream().anyMatch(OrderNotification::isTaken);
        if (alreadyTaken) {
            sendText(takerChatId, "Этот заказ уже взят другим водителем.");
            return;
        }

        Order order = orderRepository.findById(orderId).orElse(null);
        if (order == null) return;

        for (OrderNotification n : notifications) {
            if (n.getChatId() == takerChatId) {
                n.setTaken(true);
                sendText(takerChatId, "📞 Телефон клиента: " + order.getPhone());
            } else {
                removeButton(n.getChatId(), n.getMessageId());
            }
        }
    }

    private void notifyDrivers(Order order) {
        List<Subscriber> drivers = subscriberRepository.findAllByActiveTrue();
        if (drivers.isEmpty()) return;

        String passport = "eu".equalsIgnoreCase(order.getPassportType()) ? "ЕС" : "Другой";
        String priceLine = order.getShownPrice() != null
                ? "💰 Цена на сайте: %.0f €".formatted(order.getShownPrice())
                : "💰 Цена на сайте не была показана клиенту";
        String text = """
                🚗 Новый заказ #%d

                📍 Откуда: %s
                🏁 Куда: %s
                📅 Дата: %s
                🪪 Паспорт: %s
                %s
                """.formatted(
                order.getId(),
                order.getFromCity(),
                order.getToCity(),
                order.getDate().format(DATE_FMT),
                passport,
                priceLine
        );

        InlineKeyboardMarkup keyboard = InlineKeyboardMarkup.builder()
                .keyboardRow(List.of(
                        InlineKeyboardButton.builder()
                                .text("Беру")
                                .callbackData("take_" + order.getId())
                                .build()
                ))
                .build();

        for (Subscriber driver : drivers) {
            try {
                Message sent = transferBot.execute(SendMessage.builder()
                        .chatId(driver.getChatId())
                        .text(text)
                        .replyMarkup(keyboard)
                        .build());
                notificationRepository.save(
                        new OrderNotification(order.getId(), driver.getChatId(), sent.getMessageId())
                );
            } catch (TelegramApiException e) {
                log.error("Failed to notify driver {}: {}", driver.getChatId(), e.getMessage());
            }
        }
    }

    private void removeButton(long chatId, int messageId) {
        try {
            transferBot.execute(EditMessageReplyMarkup.builder()
                    .chatId(chatId)
                    .messageId(messageId)
                    .replyMarkup(InlineKeyboardMarkup.builder().keyboard(List.of()).build())
                    .build());
        } catch (TelegramApiException e) {
            log.error("Failed to remove button for chatId {}: {}", chatId, e.getMessage());
        }
    }

    private void sendText(long chatId, String text) {
        try {
            transferBot.execute(SendMessage.builder().chatId(chatId).text(text).build());
        } catch (TelegramApiException e) {
            log.error("Failed to send message to {}: {}", chatId, e.getMessage());
        }
    }
}
