import { PubSubClient, PubSubRedemptionMessage } from "@twurple/pubsub";
import { injectable } from "inversify";
import { AuthProvider } from "./AuthProvider.ts";

@injectable()
export class TwitchPubSubClient {
    private client?: PubSubClient;
    private userId?: string;

    constructor(
        private authProvider: AuthProvider,
    ) {}

    public async connect() {
        this.client = new PubSubClient();
        this.userId = await this.client.registerUserListener(this.authProvider.getAuthProvider(),);

        console.log("INFO: PubSub conectado");
    }

    public getClient(): PubSubClient {
        if (!this.client) throw new Error("No pubsub client");
        return this.client;
    }

    public getUserId(): string {
        if (!this.userId) throw new Error("No pubsub userId");
        return this.userId;
    }

    public onRedemption(callback: (message: PubSubRedemptionMessage) => void) {
        return this.getClient().onRedemption(this.getUserId(), callback);
    }
}
