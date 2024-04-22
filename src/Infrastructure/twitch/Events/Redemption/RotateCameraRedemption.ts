import { PubSubRedemptionMessage } from "@twurple/pubsub/lib/messages/PubSubRedemptionMessage";
import RotateCameraUseCase from "../../../../Domain/UseCases/RotateCameraUseCase";
import TwitchChatClient from "../../TwitchChatClient";
import AbstractRedemption from "./AbstractRedemption";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export default class RotateCameraRedemption extends AbstractRedemption {
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

    public handle(redemption: PubSubRedemptionMessage): void {
        console.log('reward rodar camera');

        this.rotateCameraUseCase.execute(180);
    }
}