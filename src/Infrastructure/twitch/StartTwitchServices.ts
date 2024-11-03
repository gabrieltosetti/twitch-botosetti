import { injectable } from "inversify";
import { AuthProvider } from "./AuthProvider.ts";
import { ChatHandler } from "./Events/Chat/ChatHandler.ts";
import { RedemptionHandler } from "./Events/Redemption/RedemptionHandler.ts";
import { TwitchChatClient } from "./TwitchChatClient.ts";
import { TwitchPubSubClient } from "./TwitchPubSubClient.ts";

@injectable()
export class StartTwichServices {
  constructor(
    private authProvider: AuthProvider,
    private twitchPubSubClient: TwitchPubSubClient,
    private twitchChatClient: TwitchChatClient,
    private chatHandler: ChatHandler,
    private redemptionHandler: RedemptionHandler,
  ) {}

  public async execute() {
    await this.authProvider.authenticate();

    await this.twitchPubSubClient.connect();
    await this.twitchChatClient.connect();

    this.chatHandler.register();
    this.redemptionHandler.register();
  }
}
