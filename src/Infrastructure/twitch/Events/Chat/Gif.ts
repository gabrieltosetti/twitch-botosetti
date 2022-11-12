'use strict';

import Utils from "../../../../Application/Helpers/utils";
import { AbstractChat } from "./AbstractChat";
import * as https from 'https';

export class Gif extends AbstractChat {
    private static posicaoAtual: number = 1;

    public isValid(): boolean {
        return (this.message === '!gif' || this.message.indexOf('!gif ') === 0);
    }

    public handle(): void {
        if (this.message === '!gif') {
            this.chatSay(`Pesquise por qualquer gif! Use !gif <nome do gif>. Por exemplo: !gif rocket league`);
            return;
        }
        
        let termoPesquisa = encodeURI(this.message.substring(5));

        https.get(this.getURI(termoPesquisa), (getRes) => {

            getRes.setEncoding('utf8');
            let rawData = '';
            getRes.on('data', (chunk) => { rawData += chunk; });
            getRes.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    const gifUrl = parsedData.results[0].media[0].gif.url;
                    console.log(gifUrl);

                    Utils.responseWrite(gifUrl);
                } catch (e: any) {
                    console.error(e.message);
                }
            });
        }).on('error', (e) => {
            console.error(`GIF CHAT: Got error: ${e.message}`);
        });
    }

    private getRandomGifPos(): number {
        let posicaoAleatoria = Utils.getRandomInt(1, 5);

        if (posicaoAleatoria === Gif.posicaoAtual) return this.getRandomGifPos();

        return Gif.posicaoAtual = posicaoAleatoria;
    }

    private getApiKey(): string {
        return process.env.TENOR_GIF_API_KEY || '';
    }

    private getURI(termoPesquisa: string): string {
        return `https://g.tenor.com/v1/search`
            + `?key=` + this.getApiKey()
            + `&locale=pt_BR`
            + `&q=` + termoPesquisa
            + `&limit=1`
            + `&pos=` + this.getRandomGifPos()
            + `&contentfilter=high`;
    }
}