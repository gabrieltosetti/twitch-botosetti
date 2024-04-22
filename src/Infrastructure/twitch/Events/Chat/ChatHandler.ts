import { autoInjectable } from 'tsyringe';
import TwitchChatClient from "../../TwitchChatClient";
import AbstractChat from "./AbstractChat";
import GifChat from "./GifChat";

@autoInjectable()
export default class ChatHandler {
    constructor(
        private chatClient: TwitchChatClient,
        private gifChat: GifChat
    ) { }

    public register(): void {
        this.chatClient.getChatClient().onMessage((channel: string, user: string, message: string) => {
            console.log('chat: ', message);

            for (let chatCommand of this.getEventClass()) {
                if (chatCommand.isValid(message, user)) chatCommand.handle(message, user);
            }
        });

        console.log('INFO: Chat registrado.');
    }

    private * getEventClass(): Generator<AbstractChat, void, unknown> {
        yield this.gifChat;
    }
}