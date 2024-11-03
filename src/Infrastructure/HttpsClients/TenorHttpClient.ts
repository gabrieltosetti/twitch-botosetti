import axios from "axios";
import { injectable } from "inversify";
import { GifRepositoryInterface } from "../../Domain/Repositories/GifRepositoryInterface.ts";

@injectable()
export class TenorHttpClient implements GifRepositoryInterface {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = Deno.env.get("TENOR_GIF_API_KEY") || "";
    this.baseUrl = Deno.env.get("TENOR_URI") || "";
  }

    public async findByTitleWithPhrase(searchPhrase: string, resultIndex: number): Promise<string> {
    let response;

    try {
      response = await axios.get(
        this.baseUrl + "/search",
        {
          params: {
            key: this.apiKey,
            locale: "pt_BR",
            q: searchPhrase,
            limit: 1,
            pos: resultIndex,
            contentfilter: "high",
          },
        },
      );
    } catch (e) {
      console.error(e);
      throw e;
    }

    return response.data.results[0].media[0].gif.url;
  }
}
