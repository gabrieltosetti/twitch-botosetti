import { autoInjectable } from 'tsyringe';
import { PubSubRedemptionMessage } from "@twurple/pubsub/lib/messages/PubSubRedemptionMessage";
import TwitchPubSubClient from "../../TwitchPubSubClient";
import AbstractRedemption from "./AbstractRedemption";
import RotateCameraRedemption from "./RotateCameraRedemption";

@autoInjectable()
export default class RedemptionHandler {
    constructor(
        private pubSubClient: TwitchPubSubClient,
        private rotateCameraRedemption: RotateCameraRedemption
    ) {}

    public register() {
        this.pubSubClient.onRedemption((redemption: PubSubRedemptionMessage) => {
            for (let chatCommand of this.getEventClass()) {
                if (chatCommand.isValid(redemption)) chatCommand.handle(redemption);
            }
        });

        console.log('INFO: PubSub registrado.');
    }

    private * getEventClass(): Generator<AbstractRedemption, void, unknown> {
        yield this.rotateCameraRedemption;
    }
}