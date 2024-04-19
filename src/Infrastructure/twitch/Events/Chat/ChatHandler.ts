import TwitchChatClient from "../../TwitchChatClient";
import AbstractChat from "./AbstractChat";
import GifChat from "./GifChat";
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export default class ChatHandler {
    chatClient: TwitchChatClient;

    constructor(chatClient: TwitchChatClient) {
        this.chatClient = chatClient;
    }

    public register(): void {
        this.chatClient.getChatClient().onMessage((channel: string, user: string, message: string) => {
            console.log('chat: ', message);

            for (let chatCommand of this.getEventClass(message, user, channel)) {
                if (chatCommand.isValid()) chatCommand.handle();
            }
        });

        console.log('INFO: Chat registrado.');
    }

    private * getEventClass(message: string, user: string, channel: string): Generator<AbstractChat, void, unknown> {
        yield new GifChat(this.chatClient, message, user, channel);
    }
}