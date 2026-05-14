package com.overridetech.transfer.bot.commands;

import com.overridetech.transfer.service.SubscriberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.meta.api.objects.Message;

@Component
@RequiredArgsConstructor
public class UnsubscribeCommand implements BotCommand {

    private final SubscriberService subscriberService;

    @Override
    public String command() {
        return "/unsubscribe";
    }

    @Override
    public String handle(Message message) {
        boolean unsubscribed = subscriberService.unsubscribe(message.getChatId());
        return unsubscribed
                ? "Вы отписались от получения заказов."
                : "Вы не были подписаны.";
    }
}