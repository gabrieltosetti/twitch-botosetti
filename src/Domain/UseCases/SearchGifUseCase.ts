import Utils from "../../Application/Helpers/Utils";
import TenorHttpClientInterface from "../HttpClients/TenorHttpClientInterface";

export default class SearchGifUseCase {
    private trenorHttpClient: TenorHttpClientInterface;
    private static currentIndex: number = 1;

    constructor(trenorHttpClient: TenorHttpClientInterface) {
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