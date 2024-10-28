import { autoInjectable } from 'tsyringe';
import TwitchChatClient from "../../TwitchChatClient.ts";
import AbstractChat from "./AbstractChat.ts";
import GifChat from "./Impl/GifChat.ts";
import AlertChat from './Impl/AlertChat.ts';

@autoInjectable()
export default class ChatHandler {
    constructor(
        private chatClient: TwitchChatClient,
        private gifChat: GifChat,
        private alertChat: AlertChat
    ) { }

    public register(): void {
        this.chatClient.getChatClient().onMessage((channel: string, user: string, message: string) => {
            console.log('chat:', message);

            for (let chatCommand of this.getEventClass()) {
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