import { RefreshingAuthProvider } from '@twurple/auth';
import { ChatClient } from '@twurple/chat';
import { promises as fs } from 'fs';
import { getChatCommand } from './twitch/ChatCommand/ChatExporter';
import * as PubSub from './twitch/pubsub';
require('dotenv').config();

async function main() {
    const clientId = process.env.BOT_CLIENT_ID || '';
    const clientSecret = process.env.BOT_CLIENT_SECRET || '';

    const tokenData = JSON.parse(await fs.readFile('./tokens.json', 'UTF-8' as BufferEncoding));
    const authProvider = new RefreshingAuthProvider(
        {
            clientId,
            clientSecret,
            onRefresh: async newTokenData => await fs.writeFile('./tokens.json', JSON.stringify(newTokenData, null, 4), 'UTF-8' as BufferEncoding)
        },
        tokenData
    );

    PubSub.start(authProvider);

    const chatClient = new ChatClient({ authProvider, channels: [String(process.env.CHANNEL_NAME)] });
    await chatClient.connect();

    chatClient.onMessage((channel: string, user: string, message: string) => {
        console.log('chat:', message);

        for (let chatCommand of getChatCommand(message, user)) {
            if (chatCommand.isValid()) chatCommand.handle();
        }

        if (message === '!ping') {
            chatClient.say(channel, 'Pong!');
        } else if (message === '!dice') {
            const diceRoll = Math.floor(Math.random() * 6) + 1;
            chatClient.say(channel, `@${user} rolled a ${diceRoll}`)
        }
    });

    chatClient.onSub((channel, user) => {
        chatClient.say(channel, `Thanks to @${user} for subscribing to the channel!`);
    });
    chatClient.onResub((channel, user, subInfo) => {
        chatClient.say(channel, `Thanks to @${user} for subscribing to the channel for a total of ${subInfo.months} months!`);
    });
    chatClient.onSubGift((channel, user, subInfo) => {
        chatClient.say(channel, `Thanks to ${subInfo.gifter} for gifting a subscription to ${user}!`);
    });
    chatClient.onSubGift((channel, user, subInfo) => {
        chatClient.say(channel, `Thanks to ${subInfo.gifter} for gifting a subscription to ${user}!`);
    });


}

main();