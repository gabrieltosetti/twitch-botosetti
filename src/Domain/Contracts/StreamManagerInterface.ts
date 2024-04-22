import { PubSubRedemptionMessage } from "@twurple/pubsub";

export default interface StreamManagerInterface {
    say(message: string): void;
    onRedemption(callback: (message: PubSubRedemptionMessage) => void): void;
    onMessage(callback: (user: string, message: string) => void): void
}