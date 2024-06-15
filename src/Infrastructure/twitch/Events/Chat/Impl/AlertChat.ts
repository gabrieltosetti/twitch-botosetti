import { autoInjectable } from "tsyringe";
import Utils from "../../../../../Application/Helpers/Utils";
import AbstractChat from ".././AbstractChat";
import TwitchChatClient from "../../../TwitchChatClient";
import sound from "sound-play";

@autoInjectable()
export default class AlertChat extends AbstractChat {
    constructor(chatClient: TwitchChatClient) {
        super(chatClient);
    }

    public isValid(message: string, user: string): boolean {
        return true;
    }

    public async handle(message: string, user: string): Promise<void> {
        const now = new Date();
        const isNowGreaterThanEqualFiveMinutes = (now.getTime() - Utils.date.getTime()) >= 300000;
        Utils.date = now;

        if (!isNowGreaterThanEqualFiveMinutes) {
            return;
        }

        sound.play(Utils.getAudioFile('vine-boom.mp3'));
    }
}