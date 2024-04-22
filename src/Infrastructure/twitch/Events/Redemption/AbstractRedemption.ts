import { PubSubRedemptionMessage } from "@twurple/pubsub/lib/messages/PubSubRedemptionMessage";

export default abstract class AbstractRedemption {
    protected abstract rewardId: string;

    public abstract isValid(redemption: PubSubRedemptionMessage): boolean;
    public abstract handle(redemption: PubSubRedemptionMessage): void;
}