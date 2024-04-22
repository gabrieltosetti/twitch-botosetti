import { autoInjectable, inject } from "tsyringe";
import Utils from "../../../../Application/Helpers/Utils";
import StreamManagerInterface from "../../../Contracts/StreamManagerInterface";
import SearchGifUseCase from "../../../UseCases/SearchGifUseCase";
import AbstractChat from "../AbstractChat";

@autoInjectable()
export default class GifChat extends AbstractChat {
    constructor(
        @inject("StreamManagerInterface") private readonly streamManager: StreamManagerInterface,
        private readonly searchGifUseCase: SearchGifUseCase
    ) {
        super();
    }

    public isValid(message: string, user: string): boolean {
        return (message === '!gif' || message.indexOf('!gif ') === 0);
    }

    public async handle(message: string, user: string): Promise<void> {
        if (message === '!gif') {
            this.streamManager.say(
                `Pesquise por qualquer gif! Use !gif <nome do gif>. Por exemplo: !gif rocket league`
            );
            return;
        }

        const searchPhrase = encodeURI(message.substring(5));
        const gifUrl = await this.searchGifUseCase.execute(searchPhrase);

        console.debug(gifUrl);
        Utils.responseWrite(gifUrl);
    }
}