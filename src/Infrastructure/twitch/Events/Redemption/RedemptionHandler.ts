'use strict';

import { PubSubRedemptionMessage } from "@twurple/pubsub/lib/messages/PubSubRedemptionMessage";
import { pubSubClient } from "../../pubSubClient";
import { AbstractRedemption } from "./AbstractRedemption";
import { RotateCameraRedemption } from "./RotateCameraRedemption";

export class RedemptionHandler {
    public static register() {
        pubSubClient.onRedemption((redemption: PubSubRedemptionMessage) => {
            for (let chatCommand of this.getEventClass(redemption)) {
                if (chatCommand.isValid()) chatCommand.handle();
            }
        });

        console.log('INFO: PubSub registrado.');
    }

    private static * getEventClass(redemption: PubSubRedemptionMessage): Generator<AbstractRedemption, void, unknown> {
        yield new RotateCameraRedemption(redemption);
    }
}