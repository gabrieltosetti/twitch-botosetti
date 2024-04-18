import { container } from 'tsyringe';
import TwitchPubSubClient from "./pubSubClient";
import AuthProvider from './authProvider';
import RedemptionHandler from "./Events/Redemption/RedemptionHandler";
import TwitchChatClient from "./chatClient";
import ChatHandler from "./Events/Chat/ChatHandler";

export async function startTwichServices() {
    await container.resolve(AuthProvider).authenticate();

    await container.resolve(TwitchPubSubClient).connect();
    await container.resolve(TwitchChatClient).connect();
    
    container.resolve(ChatHandler).register();
    container.resolve(RedemptionHandler).register();
}