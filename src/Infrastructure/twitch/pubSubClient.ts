import { singleton, autoInjectable } from 'tsyringe';
import { PubSubRedemptionMessage, PubSubClient } from '@twurple/pubsub';
import AuthProvider from './authProvider';

@singleton()
@autoInjectable()
export default class TwitchPubSubClient {
    private authProvider: AuthProvider;
    private client?: PubSubClient;
    private userId?: string;

    constructor(authProvider: AuthProvider) {
        this.authProvider = authProvider;
    }

    public async connect() {
        this.client = new PubSubClient();
        this.userId = await this.client.registerUserListener(this.authProvider.getAuthProvider());

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

    public onRedemption(callback: (message: PubSubRedemptionMessage) => void) {
        return this.getClient().onRedemption(this.getUserId(), callback);
    }
}