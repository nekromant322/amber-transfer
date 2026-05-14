package com.overridetech.transfer.dto;

import java.time.LocalDate;

public record CreateOrderRequest(
        String from,
        String to,
        LocalDate date,
        String passport,
        String phone
) {}
