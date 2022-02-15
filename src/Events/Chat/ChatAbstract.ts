import { ChatUserstate } from "tmi.js";
import { client } from './../../twitch/connect';

export abstract class ChatAbstract {
    abstract handleMessage(userstate: ChatUserstate, msg: string, self: boolean): void;

    say(message: string) {
        client.say(process.env.CHANNEL_NAME || '', message);
    }
}
