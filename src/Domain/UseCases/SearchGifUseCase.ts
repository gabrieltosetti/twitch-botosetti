import { autoInjectable, inject } from "tsyringe";
import Utils from "../../Application/Helpers/Utils";
import GifRepositoryInterface from "../Repositories/GifRepositoryInterface";

@autoInjectable()
export default class SearchGifUseCase {
    private static currentIndex: number = 1;

    constructor(
        @inject("GifRepositoryInterface") private readonly gifRepository: GifRepositoryInterface
    ) { }

    public async execute(searchPhrase: string): Promise<string> {
        const gifUrl = await this.gifRepository.findByTitleWithPhrase(
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