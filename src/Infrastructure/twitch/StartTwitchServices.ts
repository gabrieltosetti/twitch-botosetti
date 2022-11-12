'use strict';

import { pubSubClient } from "./pubSubClient";
import { authProvider } from './authProvider';
import { RedemptionHandler } from "./Events/Redemption/RedemptionHandler";
import { chatClient } from "./chatClient";
import { ChatHandler } from "./Events/Chat/ChatHandler";

export async function startTwichServices() {
    // Autenticar com as credenciais da twitch
    await authProvider.authenticate();

    await pubSubClient.connect();
    await chatClient.connect();

    RedemptionHandler.register();
    ChatHandler.register();
}