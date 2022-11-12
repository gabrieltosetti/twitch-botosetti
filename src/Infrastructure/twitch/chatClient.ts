'use strict';

import { ChatClient } from '@twurple/chat';
import { authProvider } from './authProvider';

class TwitchChatClient {
    private chatClient?: ChatClient;

    public async connect() {
        this.chatClient = new ChatClient({
            authProvider: authProvider.getAuthProvider(),
            channels: [String(process.env.CHANNEL_NAME)]
        });

        await this.chatClient.connect();
        console.log('INFO: Chat conectado');
    }

    public getChatClient(): ChatClient {
        if (!this.chatClient) throw new Error('No chatClient');
        return this.chatClient;
    }
}

export const chatClient = new TwitchChatClient();