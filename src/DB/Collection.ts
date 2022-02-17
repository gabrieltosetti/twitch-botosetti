type Data = {
    ChatEvents: Array<ChatEvent>;
};

type ChatEvent = {
    name: string;
    enabled: boolean;
};

export default class Collection {
    static data: Data;
}
