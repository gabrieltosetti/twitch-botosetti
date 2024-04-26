import RedemptionMessageDTO from "../../DTOs/RedemptionMessageDTO";

export default abstract class AbstractRedemption {
    protected abstract rewardId: string;

    public abstract isValid(redemption: RedemptionMessageDTO): boolean;
    public abstract handle(redemption: RedemptionMessageDTO): void;
}