import Utils from "../../Application/Helpers/Utils";
import GifRepositoryInterface from "../Repositories/GifRepositoryInterface";

export default class SearchGifUseCase {
    private trenorHttpClient: GifRepositoryInterface;
    private static currentIndex: number = 1;

    constructor(trenorHttpClient: GifRepositoryInterface) {
        this.trenorHttpClient = trenorHttpClient;
    }

    public async execute(searchPhrase: string): Promise<string> {
        const gifUrl = await this.trenorHttpClient.findByTitleWithPhrase(
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