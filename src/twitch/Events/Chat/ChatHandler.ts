'use strict';

import { chatClient } from "../../chatClient";
import { AbstractChat } from "./AbstractChat";
import { Gif } from "./Gif";

export class ChatHandler {
    public static register() {
        chatClient.getChatClient().onMessage((channel: string, user: string, message: string) => {
            console.log('chat: ', message);

            for (let chatCommand of this.getEventClass(message, user)) {
                if (chatCommand.isValid()) chatCommand.handle();
            }
        });

        console.log('INFO: Chat registrado.');
    }

    private static * getEventClass(message: string, user: string): Generator<AbstractChat, void, unknown> {
        yield new Gif(message, user);
    }
}