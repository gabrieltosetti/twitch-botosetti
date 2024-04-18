import { autoInjectable } from 'tsyringe';
import { PubSubRedemptionMessage } from "@twurple/pubsub/lib/messages/PubSubRedemptionMessage";
import TwitchPubSubClient from "../../pubSubClient";
import { AbstractRedemption } from "./AbstractRedemption";
import { RotateCameraRedemption } from "./RotateCameraRedemption";

@autoInjectable()
export default class RedemptionHandler {
    constructor(private pubSubClient: TwitchPubSubClient) {}

    public register() {
        this.pubSubClient.onRedemption((redemption: PubSubRedemptionMessage) => {
            for (let chatCommand of this.getEventClass(redemption)) {
                if (chatCommand.isValid()) chatCommand.handle();
            }
        });

        console.log('INFO: PubSub registrado.');
    }

    private * getEventClass(redemption: PubSubRedemptionMessage): Generator<AbstractRedemption, void, unknown> {
        yield new RotateCameraRedemption(redemption);
    }
}