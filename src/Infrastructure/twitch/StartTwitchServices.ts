import { autoInjectable } from 'tsyringe';
import TwitchPubSubClient from "./TwitchPubSubClient";
import AuthProvider from './AuthProvider';
import RedemptionHandler from "./Events/Redemption/RedemptionHandler";
import TwitchChatClient from "./TwitchChatClient";
import ChatHandler from "./Events/Chat/ChatHandler";

@autoInjectable()
export default class StartTwichServices {
    constructor(
        private authProvider: AuthProvider,
        private twitchPubSubClient: TwitchPubSubClient,
        private twitchChatClient: TwitchChatClient,
        private chatHandler: ChatHandler,
        private redemptionHandler: RedemptionHandler

    ) { }

    public async execute() {
        await this.authProvider.authenticate();

        await this.twitchPubSubClient.connect();
        await this.twitchChatClient.connect();

        this.chatHandler.register();
        this.redemptionHandler.register();
    }
}