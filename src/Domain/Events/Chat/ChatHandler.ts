import { autoInjectable, inject } from 'tsyringe';
import GifChat from './Impl/GifChat';
import AbstractChat from './AbstractChat';
import StreamManagerInterface from '../../Contracts/StreamManagerInterface';

@autoInjectable()
export default class ChatHandler {
    constructor(
        @inject("StreamManagerInterface") private readonly streamManager: StreamManagerInterface,
        private readonly gifChat: GifChat
    ) { }

    private * getEventClass(): Generator<AbstractChat, void, unknown> {
        yield this.gifChat;
    }

    public register(): void {
        this.streamManager.onMessage((user: string, message: string) => {
            console.log('chat: ', message);

            for (let chatCommand of this.getEventClass()) {
                if (chatCommand.isValid(message, user)) chatCommand.handle(message, user);
            }
        });

        console.log('INFO: Chat registrado.');
    }
}