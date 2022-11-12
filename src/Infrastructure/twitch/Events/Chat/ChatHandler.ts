'use strict';

import { chatClient } from "../../chatClient";
import { AbstractChat } from "./AbstractChat";
import { GifChat } from "./GifChat";

export class ChatHandler {
    public static register() {
        chatClient.getChatClient().onMessage((channel: string, user: string, message: string) => {
            console.log('chat: ', message);

            for (let chatCommand of this.getEventClass(message, user, channel)) {
                if (chatCommand.isValid()) chatCommand.handle();
            }
        });

        console.log('INFO: Chat registrado.');
    }

    private static * getEventClass(message: string, user: string, channel: string): Generator<AbstractChat, void, unknown> {
        yield new GifChat(message, user, channel);
    }
}