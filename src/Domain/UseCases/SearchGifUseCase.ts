import { TYPES } from "../../Application/Configs/Types.ts";
import { Utils } from "../../Application/Helpers/Utils.ts";
import type { GifRepositoryInterface } from "../Repositories/GifRepositoryInterface.ts";
import { inject, injectable } from "inversify";

@injectable()
export class SearchGifUseCase {
  private static currentIndex: number = 1;

  constructor(
    @inject(TYPES.GifRepositoryInterface) private trenorHttpClient: GifRepositoryInterface,
  ) {}

  public async execute(searchPhrase: string): Promise<string> {
    const gifUrl = await this.trenorHttpClient.findByTitleWithPhrase(
      searchPhrase,
      this.getRandomGifIndex(),
    );

    if (!gifUrl) {
      throw new Error("Gif not found");
    }

    return gifUrl;
  }

  private getRandomGifIndex(): number {
    const randomIndex = Utils.getRandomInt(1, 8);

    if (randomIndex === SearchGifUseCase.currentIndex) {
      return this.getRandomGifIndex();
    }

    return SearchGifUseCase.currentIndex = randomIndex;
  }
}
