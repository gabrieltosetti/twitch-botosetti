import { autoInjectable, inject } from 'tsyringe';
import { PubSubRedemptionMessage } from "@twurple/pubsub/lib/messages/PubSubRedemptionMessage";
import AbstractRedemption from "./AbstractRedemption";
import RotateCameraRedemption from "./RotateCameraRedemption";
import StreamManagerInterface from '../../../../Domain/Contracts/StreamManagerInterface';

@autoInjectable()
export default class RedemptionHandler {
    constructor(
        @inject("StreamManagerInterface") private readonly streamManager: StreamManagerInterface,
        private rotateCameraRedemption: RotateCameraRedemption
    ) {}

    public register() {
        this.streamManager.onRedemption((redemption: PubSubRedemptionMessage) => {
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