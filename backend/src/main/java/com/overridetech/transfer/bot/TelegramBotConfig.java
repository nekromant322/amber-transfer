package com.overridetech.transfer.bot;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.telegram.telegrambots.meta.TelegramBotsApi;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import org.telegram.telegrambots.updatesreceivers.DefaultBotSession;

import jakarta.annotation.PostConstruct;

@Slf4j
@Configuration
public class TelegramBotConfig {

    private final TransferBot transferBot;

    public TelegramBotConfig(TransferBot transferBot) {
        this.transferBot = transferBot;
    }

    @PostConstruct
    public void registerBot() {
        try {
            TelegramBotsApi api = new TelegramBotsApi(DefaultBotSession.class);
            api.registerBot(transferBot);
            log.info("Telegram bot registered: {}", transferBot.getBotUsername());
        } catch (TelegramApiException e) {
            log.error("Failed to register Telegram bot: {}", e.getMessage(), e);
        }
    }
}
