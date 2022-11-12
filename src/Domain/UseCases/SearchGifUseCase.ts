import Utils from "../../Application/Helpers/utils";
import { TrenorHttpClientInterface } from "../HttpClients/TrenorHttpClientInterface";

export class SearchGifUseCase {
    private trenorHttpClient: TrenorHttpClientInterface;
    private static currentIndex: number = 1;

    constructor(trenorHttpClient: TrenorHttpClientInterface) {
        this.trenorHttpClient = trenorHttpClient;
    }

    public async execute(searchPhrase: string): Promise<string> {
        const gifUrl = await this.trenorHttpClient.searchGifFromPhrase(
            searchPhrase,
            this.getRandomGifIndex()
        );

        if (!gifUrl) {
            throw new Error("Gif not found");
        }

        return gifUrl;
    }

    private getRandomGifIndex(): number {
        let randomIndex = Utils.getRandomInt(1, 8);

        if (randomIndex === SearchGifUseCase.currentIndex) return this.getRandomGifIndex();

        return SearchGifUseCase.currentIndex = randomIndex;
    }
}