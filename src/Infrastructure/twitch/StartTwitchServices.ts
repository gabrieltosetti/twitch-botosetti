import { container } from 'tsyringe';
import TwitchPubSubClient from "./TwitchPubSubClient";
import AuthProvider from './AuthProvider';
import RedemptionHandler from "./Events/Redemption/RedemptionHandler";
import TwitchChatClient from "./TwitchChatClient";
import ChatHandler from "./Events/Chat/ChatHandler";

export async function startTwichServices() {
    await container.resolve(AuthProvider).authenticate();

    await container.resolve(TwitchPubSubClient).connect();
    await container.resolve(TwitchChatClient).connect();
    
    container.resolve(ChatHandler).register();
    container.resolve(RedemptionHandler).register();
}