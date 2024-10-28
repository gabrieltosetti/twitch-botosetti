import { PubSubRedemptionMessage } from "@twurple/pubsub";
import TwitchChatClient from "../../TwitchChatClient.ts";

export default abstract class AbstractRedemption {
    protected abstract rewardId: string;

    constructor(
        private chatClient: TwitchChatClient
    ) { }

    public abstract isValid(redemption: PubSubRedemptionMessage): boolean;

    public abstract handle(redemption: PubSubRedemptionMessage): void;

    protected say(message: string) {
        return this.chatClient.getChatClient().say("GTosetti", message);
    }
}