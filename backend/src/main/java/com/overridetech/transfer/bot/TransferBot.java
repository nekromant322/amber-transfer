package com.overridetech.transfer.bot;

import com.overridetech.transfer.bot.commands.BotCommand;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Message;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Slf4j
@Component
public class TransferBot extends TelegramLongPollingBot {

    private final String username;
    private final Map<String, BotCommand> commands;

    public TransferBot(
            @Value("${telegram.token}") String token,
            @Value("${telegram.username}") String username,
            List<BotCommand> commands
    ) {
        super(token);
        this.username = username;
        this.commands = commands.stream()
                .collect(Collectors.toMap(BotCommand::command, Function.identity()));
    }

    @Override
    public String getBotUsername() {
        return username;
    }

    @Override
    public void onUpdateReceived(Update update) {
        if (!update.hasMessage() || !update.getMessage().hasText()) return;

        Message message = update.getMessage();
        String text = message.getText().split("@")[0];
        BotCommand command = commands.get(text);
        if (command == null) {
            log.debug("Unknown command: {}", message.getText());
            return;
        }

        send(message.getChatId(), command.handle(message));
    }

    private void send(long chatId, String text) {
        try {
            execute(SendMessage.builder()
                    .chatId(chatId)
                    .text(text)
                    .build());
        } catch (TelegramApiException e) {
            log.error("Failed to send message to chatId {}: {}", chatId, e.getMessage());
        }
    }
}