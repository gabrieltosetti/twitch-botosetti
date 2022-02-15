import * as tmi from 'tmi.js';
import Utils from '../utils';
import * as https from 'https';
import { ChatManager } from '../Events/Chat/ChatManager';

// Define configuration options 
const opts: tmi.Options = {
    identity: {
        username: process.env.BOT_NAME,
        password: process.env.BOT_OAUTH_TOKEN,
    },
    channels: [
        process.env.CHANNEL_NAME || ''
    ]
};

// Create a client with our options
export const client = new tmi.client(opts);

// Called every time a message comes in
client.on('message', function (channel, userstate, msg, self) {
    ChatManager.handleMessage(userstate, msg, self);
});

// Called every time the bot connects to Twitch chat
client.on('connected', function (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
});

// Connect to Twitch:
client.connect();