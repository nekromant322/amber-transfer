package com.overridetech.transfer.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "order_notifications")
@Getter
@Setter
@NoArgsConstructor
public class OrderNotification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_id", nullable = false)
    private Long orderId;

    @Column(name = "chat_id", nullable = false)
    private Long chatId;

    @Column(name = "message_id", nullable = false)
    private Integer messageId;

    @Column(name = "taken", nullable = false)
    private boolean taken = false;

    public OrderNotification(Long orderId, Long chatId, Integer messageId) {
        this.orderId = orderId;
        this.chatId = chatId;
        this.messageId = messageId;
    }
}
