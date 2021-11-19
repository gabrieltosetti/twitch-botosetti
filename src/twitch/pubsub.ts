import { AuthProvider } from '@twurple/auth/lib';
import { PubSubRedemptionMessage, PubSubClient } from '@twurple/pubsub';

export async function start(authProvider: AuthProvider) {

    const pubSubClient = new PubSubClient();
    const userId = await pubSubClient.registerUserListener(authProvider);

    pubSubClient.onRedemption(userId, (message: PubSubRedemptionMessage) => {
        console.log(message.id);
        console.log(message.rewardId);
        console.log(message.rewardTitle);
    });
}
