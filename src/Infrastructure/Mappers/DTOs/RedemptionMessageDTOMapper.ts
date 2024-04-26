import { PubSubRedemptionMessage } from "@twurple/pubsub";
import RedemptionMessageDTO from "../../../Domain/DTOs/RedemptionMessageDTO";

export default class RedemptionMessageDTOMapper {
    public static fromPubSubRedemptionMessage(message: PubSubRedemptionMessage): RedemptionMessageDTO {
        return {
            userId: message.userId,
            userName: message.userName,
            userDisplayName: message.userDisplayName,
            redemptionDate: message.redemptionDate,
            rewardId: message.rewardId,
            rewardTitle: message.rewardTitle,
            rewardPrompt: message.rewardPrompt,
            rewardCost: message.rewardCost
        };
    }
}