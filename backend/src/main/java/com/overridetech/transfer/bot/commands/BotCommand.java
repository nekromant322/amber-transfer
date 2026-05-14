package com.overridetech.transfer.bot.commands;

import org.telegram.telegrambots.meta.api.objects.Message;

public interface BotCommand {

    String command();

    String handle(Message message);
}