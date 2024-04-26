import { autoInjectable, inject } from 'tsyringe';
import AbstractRedemption from "./AbstractRedemption";
import RotateCameraRedemption from "./Impl/RotateCameraRedemption";
import StreamManagerInterface from '../../Contracts/StreamManagerInterface';
import RedemptionMessageDTO from '../../DTOs/RedemptionMessageDTO';

@autoInjectable()
export default class RedemptionHandler {
    constructor(
        @inject("StreamManagerInterface") private readonly streamManager: StreamManagerInterface,
        private rotateCameraRedemption: RotateCameraRedemption
    ) {}

    public register() {
        this.streamManager.onRedemption((redemption: RedemptionMessageDTO) => {
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