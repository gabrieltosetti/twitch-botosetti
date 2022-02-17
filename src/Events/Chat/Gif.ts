import { ChatUserstate } from "tmi.js";
import {ChatAbstract} from "./ChatAbstract";
import * as https from 'https';
import Utils from '../../utils';

export class Gif extends ChatAbstract {
    static data: any;
    static posicaoAtual = 1;
    private tenorKey = process.env.TENOR_GIF_API_KEY;

    handleMessage(userstate: ChatUserstate, msg: string, self: boolean): void {
        if (self) { return; } // Ignore messages from the bot

        console.log('Gif: ' + msg);

        // TODO: str to lower
        const commandName = msg.trim();
    
        if (commandName === '!gif') {
            this.say(`Pesquise por qualquer gif! Use !gif <nome do gif>. Por exemplo: !gif rocket league`);
        }

        if (commandName.indexOf('!gif ') !== 0) { return; }
    
        let pesquisaGif = commandName.substring(5);

        Gif.posicaoAtual = Utils.getRandomGifPos(Gif.posicaoAtual, 1, 5);

        pesquisaGif = encodeURI(pesquisaGif);

        let url = `https://g.tenor.com/v1/search?key=${this.tenorKey}&locale=pt_BR&q=${pesquisaGif}&limit=1&pos=${Gif.posicaoAtual}&contentfilter=high`;

        https.get(url, (getRes) => {

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
            console.error(`Got error: ${e.message}`);
        });
    }
}