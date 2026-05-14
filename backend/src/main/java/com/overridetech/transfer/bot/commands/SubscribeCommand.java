package com.overridetech.transfer.bot.commands;

import com.overridetech.transfer.service.SubscriberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.meta.api.objects.Message;

@Component
@RequiredArgsConstructor
public class SubscribeCommand implements BotCommand {

    private final SubscriberService subscriberService;

    @Override
    public String command() {
        return "/subscribe";
    }

    @Override
    public String handle(Message message) {
        long chatId = message.getChatId();
        String username = message.getFrom().getUserName();
        String firstName = message.getFrom().getFirstName();

        boolean subscribed = subscriberService.subscribe(chatId, username, firstName);
        return subscribed
                ? "Вы успешно подписались на получение заказов!"
                : "Вы уже подписаны.";
    }
}