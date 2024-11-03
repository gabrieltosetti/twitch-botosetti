import { injectable } from "inversify";
import { TwitchChatClient } from "../../TwitchChatClient.ts";
import { AbstractChat } from "./AbstractChat.ts";
import { AlertChat } from './Impl/AlertChat.ts';
import { GifChat } from "./Impl/GifChat.ts";

@injectable()
export class ChatHandler {
    constructor(
        private chatClient: TwitchChatClient,
        private gifChat: GifChat,
        private alertChat: AlertChat
    ) { }

    public register(): void {
        this.chatClient.getChatClient().onMessage((_channel: string, user: string, message: string) => {
            console.log('chat:', message);

            for (const chatCommand of this.getEventClass()) {
                if (chatCommand.isValid(message, user)) chatCommand.handle(message, user);
            }
        });

        console.log('INFO: Chat registrado.');
    }

    private * getEventClass(): Generator<AbstractChat, void, unknown> {
        yield this.alertChat;
        yield this.gifChat;
    }
}