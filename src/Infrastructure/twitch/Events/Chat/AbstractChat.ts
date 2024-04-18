import TwitchChatClient from "../../chatClient";

export default abstract class AbstractChat {
    private chatClient: TwitchChatClient;
    protected message: string;
    protected user: string;
    protected channel: string;

    public constructor(chatClient: TwitchChatClient, message: string, user: string, channel: string) {
        this.chatClient = chatClient;
        this.message = message;
        this.user = user;
        this.channel = channel;
    }

    public abstract isValid(): boolean;

    public abstract handle(): void;

    protected chatSay(message: string) {
        return this.chatClient.getChatClient().say(this.channel, message);
    }
}