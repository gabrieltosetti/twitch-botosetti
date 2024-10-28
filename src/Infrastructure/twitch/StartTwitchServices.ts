import { autoInjectable } from 'tsyringe';
import TwitchPubSubClient from "./TwitchPubSubClient.ts";
import AuthProvider from './AuthProvider.ts';
import RedemptionHandler from "./Events/Redemption/RedemptionHandler.ts";
import TwitchChatClient from "./TwitchChatClient.ts";
import ChatHandler from "./Events/Chat/ChatHandler.ts";

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