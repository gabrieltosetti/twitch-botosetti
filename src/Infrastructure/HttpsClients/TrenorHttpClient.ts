import axios from "axios";
import { TrenorHttpClientInterface } from "../../Domain/HttpClients/TrenorHttpClientInterface";

export class TrenorHttpClient implements TrenorHttpClientInterface {
    private apiKey: string;
    private baseUrl: string;

    constructor() {
        this.apiKey = process.env.TENOR_GIF_API_KEY || '';
        this.baseUrl = process.env.TRENOR_URI || '';
    }

    public async searchGifFromPhrase(searchPhrase: string, resultIndex: number): Promise<string> {
        let response;

        try {
            response = await axios.get(
                this.baseUrl + '/search',
                {
                    params: {
                        key: this.apiKey,
                        locale: 'pt_BR',
                        q: searchPhrase,
                        limit: 1,
                        pos: resultIndex,
                        contentfilter: 'high'
                    }
                }
            );
        } catch (e) {
            console.error(e);
            throw e;
        }

        return response.data.results[0].media[0].gif.url;
    }
}