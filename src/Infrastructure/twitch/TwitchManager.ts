import { autoInjectable, singleton } from "tsyringe";
import StreamManagerInterface from "../../Domain/Contracts/StreamManagerInterface";
import AuthProvider from "./AuthProvider";
import { ChatClient } from "@twurple/chat";
import { PubSubClient, PubSubRedemptionMessage } from "@twurple/pubsub";

@singleton()
@autoInjectable()
export default class TwitchManager implements StreamManagerInterface {
    private readonly channelName: string = String(process.env.CHANNEL_NAME);
    private chatClient?: ChatClient;
    private pubSubClient?: PubSubClient;
    private userListenerId?: string;

    constructor(
        private readonly authProvider: AuthProvider
    ) {
    }

    public async connect(): Promise<void> {
        this.chatClient = await this.connectChat();
        this.pubSubClient = await this.connectPubSub();
    }

    private async connectChat(): Promise<ChatClient> {
        const chatClient = new ChatClient({
            authProvider: this.authProvider.getAuthProvider(),
            channels: [this.channelName]
        });

        await chatClient.connect();

        console.log('INFO: Chat conectado');

        return chatClient;
    }

    private async connectPubSub(): Promise<PubSubClient> {
        const pubSubClient = new PubSubClient();
        this.userListenerId = await pubSubClient.registerUserListener(this.authProvider.getAuthProvider());

        console.log('INFO: PubSub conectado')

        return pubSubClient;
    }

    public geUserListenerId(): string {
        if (!this.userListenerId) throw new Error('No pubsub userListenerId');
        return this.userListenerId;
    }

    private getChatClient(): ChatClient {
        if (!this.chatClient) throw new Error('No chatClient');
        return this.chatClient;
    }

    private getPubSubClient(): PubSubClient {
        if (!this.pubSubClient) throw new Error('No pubSubClient');
        return this.pubSubClient;
    }

    say(message: string): void {
        this.getChatClient().say(this.channelName, message);
    }

    onRedemption(callback: (message: PubSubRedemptionMessage) => void): void {
        this.getPubSubClient().onRedemption(this.geUserListenerId(), callback);
    }

    onMessage(callback: (user: string, message: string) => void): void {
        this.getChatClient().onMessage((channel, user, message) => {
            callback(user, message);
        });
    }
}