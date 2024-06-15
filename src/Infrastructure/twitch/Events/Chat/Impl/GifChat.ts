import { autoInjectable } from "tsyringe";
import Utils from "../../../../../Application/Helpers/Utils";
import AbstractChat from ".././AbstractChat";
import SearchGifUseCase from "../../../../../Domain/UseCases/SearchGifUseCase";
import TenorHttpClient from "../../../../HttpsClients/TenorHttpClient";
import TwitchChatClient from "../../../TwitchChatClient";

@autoInjectable()
export default class GifChat extends AbstractChat {
    constructor(chatClient: TwitchChatClient) {
        super(chatClient);
    }

    public isValid(message: string, user: string): boolean {
        return (message === '!gif' || message.indexOf('!gif ') === 0);
    }

    public async handle(message: string, user: string): Promise<void> {
        if (message === '!gif') {
            this.say(`Pesquise por qualquer gif! Use !gif <nome do gif>. Por exemplo: !gif rocket league`);
            return;
        }

        const searchPhrase = encodeURI(message.substring(5));

        const searchGifUseCase = new SearchGifUseCase(new TenorHttpClient());
        const gifUrl = await searchGifUseCase.execute(searchPhrase);

        console.debug(gifUrl);
        Utils.responseWrite(gifUrl);
    }
}