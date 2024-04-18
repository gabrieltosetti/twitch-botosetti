import { singleton, autoInjectable } from 'tsyringe';
import { ChatClient } from '@twurple/chat';
import AuthProvider from './AuthProvider';

@singleton()
@autoInjectable()
export default class TwitchChatClient {
    private authProvider: AuthProvider;
    private chatClient?: ChatClient;
    public test = 0;

    constructor(authProvider: AuthProvider) {
        this.authProvider = authProvider;
    }

    public async connect() {
        this.chatClient = new ChatClient({
            authProvider: this.authProvider.getAuthProvider(),
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