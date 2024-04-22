import TwitchChatClient from "../../TwitchChatClient";

export default abstract class AbstractChat {
    public constructor(
        private chatClient: TwitchChatClient
    ) { }

    public abstract isValid(message: string, user: string): boolean;

    public abstract handle(message: string, user: string): void;

    protected say(message: string) {
        return this.chatClient.getChatClient().say("GTosetti", message);
    }
}