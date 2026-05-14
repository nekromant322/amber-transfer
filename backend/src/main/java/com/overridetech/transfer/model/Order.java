package com.overridetech.transfer.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "from_city", nullable = false)
    private String fromCity;

    @Column(name = "to_city", nullable = false)
    private String toCity;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(name = "passport_type", nullable = false)
    private String passportType;

    @Column(name = "phone", nullable = false)
    private String phone;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private OrderStatus status = OrderStatus.PENDING;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    public Order(String fromCity, String toCity, LocalDate date, String passportType, String phone) {
        this.fromCity = fromCity;
        this.toCity = toCity;
        this.date = date;
        this.passportType = passportType;
        this.phone = phone;
        this.status = OrderStatus.PENDING;
        this.createdAt = LocalDateTime.now();
    }
}
