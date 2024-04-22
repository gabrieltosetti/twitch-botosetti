import { PubSubRedemptionMessage } from "@twurple/pubsub/lib/messages/PubSubRedemptionMessage";
import RotateCameraUseCase from "../../../../Domain/UseCases/RotateCameraUseCase";
import AbstractRedemption from "./AbstractRedemption";
import { autoInjectable, inject } from "tsyringe";
import StreamManagerInterface from "../../../../Domain/Contracts/StreamManagerInterface";

@autoInjectable()
export default class RotateCameraRedemption extends AbstractRedemption {
    protected rewardId: string = '3c546d54-0cab-4404-9455-b5b8138bd0c0';

    constructor(
        private readonly rotateCameraUseCase: RotateCameraUseCase,
    ) {
        super();
    }

    public isValid(redemption: PubSubRedemptionMessage): boolean {
        return redemption.rewardId === this.rewardId;
    }

    public handle(redemption: PubSubRedemptionMessage): void {
        console.log('reward rodar camera');

        this.rotateCameraUseCase.execute(180);
    }
}