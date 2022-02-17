import { ChatManager } from "../Events/Chat/ChatManager";
import Collection from "./Collection";

export class Migrations {
    static run() {
        Collection.data = {
            ...Collection.data,
            ChatEvents: [
                {name: ChatManager.GIF, enabled: false}
            ]
        };
    }
}