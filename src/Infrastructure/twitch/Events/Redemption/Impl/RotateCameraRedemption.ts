import { PubSubRedemptionMessage } from "@twurple/pubsub";
import { injectable } from "inversify";
import { RotateCameraUseCase } from "../../../../../Domain/UseCases/RotateCameraUseCase.ts";
import { TwitchChatClient } from "../../../TwitchChatClient.ts";
import { AbstractRedemption } from ".././AbstractRedemption.ts";

@injectable()
export class RotateCameraRedemption extends AbstractRedemption {
    protected rewardId: string = '3c546d54-0cab-4404-9455-b5b8138bd0c0';

    constructor(
        private rotateCameraUseCase: RotateCameraUseCase,
        chatClient: TwitchChatClient
    ) {
        super(chatClient);
        this.rotateCameraUseCase = rotateCameraUseCase;
    }

    public isValid(redemption: PubSubRedemptionMessage): boolean {
        return redemption.rewardId === this.rewardId;
    }

    public handle(_redemption: PubSubRedemptionMessage): void {
        console.log('reward rodar camera');

        this.rotateCameraUseCase.execute(180);
    }
}