import { ChatUserstate } from 'tmi.js';
import Collection from './../../DB/Collection';
import { ChatAbstract } from './ChatAbstract';
import Gif from './Gif';

export class ChatManager {
    static readonly GIF = 'gif';

    static insertChatEvents() {
        Collection.data = {
            ...Collection.data,
            ChatEvents: [
                {name: ChatManager.GIF, enabled: false, class: new Gif()}
            ]
        };
    }

    static enableEvent(chatEvent: string): void {
        for (let event of Collection.data.ChatEvents) {
            if (event.name === chatEvent) {
                event.enabled = true;
                break;
            }
        }
    }

    static disableEvent(chatEvent: string): void {
        for (let event of Collection.data.ChatEvents) {
            if (event.name === chatEvent) {
                event.enabled = false;
                break;
            }
        }
    }

    static handleMessage(userstate: ChatUserstate, msg: string, self: boolean): void {
        for (let chatEvent of Collection.data.ChatEvents) {

            if (!chatEvent.enabled) {
                continue;
            }

            chatEvent.class.handleMessage(userstate, msg, self);
        }
    }
}