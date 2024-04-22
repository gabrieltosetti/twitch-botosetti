import { PubSubRedemptionMessage } from "@twurple/pubsub/lib/messages/PubSubRedemptionMessage";
import TwitchChatClient from "../../TwitchChatClient";

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