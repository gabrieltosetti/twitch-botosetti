import { autoInjectable } from 'tsyringe';
import RedemptionHandler from "../../Domain/Events/Redemption/RedemptionHandler";
import ChatHandler from '../../Domain/Events/Chat/ChatHandler';

@autoInjectable()
export default class StartTwichServices {
    constructor(
        private readonly chatHandler: ChatHandler,
        private readonly redemptionHandler: RedemptionHandler
    ) { }

    public async execute() {
        this.chatHandler.register();
        this.redemptionHandler.register();
    }
}