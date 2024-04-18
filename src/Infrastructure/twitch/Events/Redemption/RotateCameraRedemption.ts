import ObsClientInterface from "../../../../Domain/Contracts/ObsClientInterface";
import { RotateCameraUseCase } from "../../../../Domain/UseCases/RotateCameraUseCase";
import AbstractRedemption from "./AbstractRedemption";
import { PubSubRedemptionMessage } from "@twurple/pubsub/lib/messages/PubSubRedemptionMessage";

export default class RotateCameraRedemption extends AbstractRedemption {
    private obsClient: ObsClientInterface;
    protected rewardId: string = '3c546d54-0cab-4404-9455-b5b8138bd0c0';

    constructor(
        redemption: PubSubRedemptionMessage,
        obsClient: ObsClientInterface
    ) {
        super(redemption);
        this.obsClient = obsClient;
    }

    public isValid(): boolean {
        return this.redemption.rewardId === this.rewardId;
    }

    public handle(): void {
        console.log('reward rodar camera');

        const rotateCameraUseCase = new RotateCameraUseCase(this.obsClient);
        rotateCameraUseCase.execute(180);
    }
}