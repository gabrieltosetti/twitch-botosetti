import { ChatAbstract } from "../Events/Chat/ChatAbstract";
import Gif from "../Events/Chat/Gif";

type Data = {
    ChatEvents: Array<ChatEvent>;
};

type ChatEvent = {
    name: string;
    enabled: boolean;
    class: ChatAbstract;
};

export default class Collection {
    static data: Data;
}
