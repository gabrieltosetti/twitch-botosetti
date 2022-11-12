import { PubSubRedemptionMessage, PubSubClient } from '@twurple/pubsub';
import { authProvider } from './authProvider';

class TwitchPubSubClient {
    private client?: PubSubClient;
    private userId?: string;

    public async connect()
    {
        this.client = new PubSubClient();
        this.userId = await this.client.registerUserListener(authProvider.getAuthProvider());

        console.log('INFO: PubSub conectado');
    }

    public getClient(): PubSubClient {
        if (!this.client) throw new Error('No pubsub client');
        return this.client;
    }

    public getUserId(): string {
        if (!this.userId) throw new Error('No pubsub userId');
        return this.userId;
    }

    public onRedemption(callback: (message: PubSubRedemptionMessage) => void)
    {
        return this.getClient().onRedemption(this.getUserId(), callback);
    }
}

export const pubSubClient = new TwitchPubSubClient();