import { autoInjectable } from "tsyringe";
import Utils from "../../../../../Application/Helpers/Utils";
import AbstractChat from ".././AbstractChat";
import TwitchChatClient from "../../../TwitchChatClient";
import sound from "sound-play";

@autoInjectable()
export default class AlertChat extends AbstractChat {
    private static readonly INTERVAL_TO_PLAY_SOUND_IN_MILI: number = Number(process.env.INTERVAL_TO_PLAY_SOUND_IN_MILI || 0);

    constructor(chatClient: TwitchChatClient) {
        super(chatClient);
    }

    public isValid(message: string, user: string): boolean {
        return true;
    }

    public async handle(message: string, user: string): Promise<void> {
        const now = new Date();
        const shouldPlaySound = (now.getTime() - Utils.date.getTime()) >= AlertChat.INTERVAL_TO_PLAY_SOUND_IN_MILI;
        Utils.date = now;

        if (!shouldPlaySound) {
            return;
        }

        sound.play(Utils.getAudioFile('vine-boom.mp3'));
    }
}