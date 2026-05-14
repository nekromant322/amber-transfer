package com.overridetech.transfer.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "subscribers")
@Getter
@Setter
@NoArgsConstructor
public class Subscriber {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "chat_id", unique = true, nullable = false)
    private Long chatId;

    @Column(name = "username")
    private String username;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "active", nullable = false)
    private boolean active = true;

    @Column(name = "subscribed_at", nullable = false)
    private LocalDateTime subscribedAt;

    public Subscriber(Long chatId, String username, String firstName) {
        this.chatId = chatId;
        this.username = username;
        this.firstName = firstName;
        this.active = true;
        this.subscribedAt = LocalDateTime.now();
    }
}