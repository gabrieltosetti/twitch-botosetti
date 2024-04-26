import { autoInjectable } from "tsyringe";
import RedemptionMessageDTO from "../../../DTOs/RedemptionMessageDTO";
import RotateCameraUseCase from "../../../UseCases/RotateCameraUseCase";
import AbstractRedemption from "../AbstractRedemption";

@autoInjectable()
export default class RotateCameraRedemption extends AbstractRedemption {
    protected rewardId: string = '3c546d54-0cab-4404-9455-b5b8138bd0c0';

    constructor(
        private readonly rotateCameraUseCase: RotateCameraUseCase,
    ) {
        super();
    }

    public isValid(redemption: RedemptionMessageDTO): boolean {
        return redemption.rewardId === this.rewardId;
    }

    public handle(redemption: RedemptionMessageDTO): void {
        console.log('reward rodar camera');

        this.rotateCameraUseCase.execute(180);
    }
}