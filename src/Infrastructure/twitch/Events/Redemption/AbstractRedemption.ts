import { PubSubRedemptionMessage } from "@twurple/pubsub";
import { injectable } from "inversify";
import { TwitchChatClient } from "../../TwitchChatClient.ts";

@injectable()
export abstract class AbstractRedemption {
  protected abstract rewardId: string;

  constructor(
    private chatClient: TwitchChatClient,
  ) {}

  public abstract isValid(redemption: PubSubRedemptionMessage): boolean;

  public abstract handle(redemption: PubSubRedemptionMessage): void;

  protected say(message: string) {
    return this.chatClient.getChatClient().say("GTosetti", message);
  }
}
