import { RefreshingAuthProvider } from '@twurple/auth';
import { ChatClient } from '@twurple/chat';
import { promises as fs } from 'fs';
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








// --------------------------------------------------------------------------------


'use strict';
require('dotenv').config()
require('./twitch/connect');


const viewsPath = __dirname + '/views/';
const PORT = process.env.PORT || 80;

import express from 'express';
import Utils from './utils';

const app = express();
const router = express.Router();

/*
================================
MIDDLEWARES
================================
*/

app.use(express.json());
app.use(express.static(viewsPath));
app.use("/", router);

router.use(function (req, res, next) {
    console.log("/" + req.method);
    next();
});

/*
================================
ROTAS
================================
*/

router.get("/", function (req, res) {
    console.log(viewsPath + "index/index.html");
    res.sendFile(viewsPath + "index/index.html");
});

router.get("/stream", function (req, res) {
    res.setHeader('Content-Type', 'text/event-stream');

    Utils.activeResponse = res;
});


router.get("/stardew-valley", function (req, res) {

});

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`)
})
