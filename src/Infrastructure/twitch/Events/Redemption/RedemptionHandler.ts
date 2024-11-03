
import { PubSubRedemptionMessage } from "@twurple/pubsub";
import { injectable } from "inversify";
import { TwitchPubSubClient } from "../../TwitchPubSubClient.ts";
import { AbstractRedemption } from "./AbstractRedemption.ts";
import { RotateCameraRedemption } from "./Impl/RotateCameraRedemption.ts";

@injectable()
export class RedemptionHandler {
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