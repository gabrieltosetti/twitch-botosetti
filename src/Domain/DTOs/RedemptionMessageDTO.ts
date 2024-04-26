export default class RedemptionMessageDTO {
    constructor(
        public userId: string,
        public userName: string,
        public userDisplayName: string,
        public redemptionDate: Date,
        public rewardId: string,
        public rewardTitle: string,
        public rewardPrompt: string,
        public rewardCost: number
    ) {
    }
}