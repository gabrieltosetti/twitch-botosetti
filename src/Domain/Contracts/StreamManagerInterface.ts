import RedemptionMessageDTO from "../DTOs/RedemptionMessageDTO";

export default interface StreamManagerInterface {
    say(message: string): void;
    onRedemption(callback: (message: RedemptionMessageDTO) => void): void;
    onMessage(callback: (user: string, message: string) => void): void
}