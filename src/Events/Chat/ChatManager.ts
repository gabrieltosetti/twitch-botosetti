import { ChatUserstate } from 'tmi.js';
import Collection from './../../DB/Collection';
import { ChatFactory } from './ChatFactory';

export class ChatManager {
    static readonly GIF = 'Gif';

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

            const chatEventClass = ChatFactory.getEventClassFromString(chatEvent.name);

            chatEventClass.handleMessage(userstate, msg, self);
        }
    }
}