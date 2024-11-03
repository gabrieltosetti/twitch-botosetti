import { injectable } from "inversify";
import { Utils } from "../../../../../Application/Helpers/Utils.ts";
import { SearchGifUseCase } from "../../../../../Domain/UseCases/SearchGifUseCase.ts";
import { TenorHttpClient } from "../../../../HttpsClients/TenorHttpClient.ts";
import { TwitchChatClient } from "../../../TwitchChatClient.ts";
import { AbstractChat } from ".././AbstractChat.ts";

@injectable()
export class GifChat extends AbstractChat {
  constructor(
    chatClient: TwitchChatClient,
  ) {
    super(chatClient);
  }

  public isValid(message: string, _user: string): boolean {
    return (message === "!gif" || message.indexOf("!gif ") === 0);
  }

  public async handle(message: string, _user: string): Promise<void> {
    if (message === "!gif") {
      this.say(`Pesquise por qualquer gif! Use !gif <nome do gif>. Por exemplo: !gif rocket league`);
      return;
    }

    const searchPhrase = encodeURI(message.substring(5));

    const searchGifUseCase = new SearchGifUseCase(new TenorHttpClient());
    const gifUrl = await searchGifUseCase.execute(searchPhrase);

    console.debug(gifUrl);
    Utils.responseWrite(gifUrl);
  }
}
