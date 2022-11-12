'use strict';

import Utils from "../../../../Application/Helpers/utils";
import { AbstractChat } from "./AbstractChat";
import { SearchGifUseCase } from "../../../../Domain/UseCases/SearchGifUseCase";
import { TrenorHttpClient } from "../../../HttpsClients/TrenorHttpClient";

export class GifChat extends AbstractChat {

    public isValid(): boolean {
        return (this.message === '!gif' || this.message.indexOf('!gif ') === 0);
    }

    public async handle(): Promise<void> {
        if (this.message === '!gif') {
            this.chatSay(`Pesquise por qualquer gif! Use !gif <nome do gif>. Por exemplo: !gif rocket league`);
            return;
        }

        const searchPhrase = encodeURI(this.message.substring(5));

        const searchGifUseCase = new SearchGifUseCase(new TrenorHttpClient());
        const gifUrl = await searchGifUseCase.execute(searchPhrase);

        console.debug(gifUrl);
        Utils.responseWrite(gifUrl);
    }
}