import { ChatClient } from "@twurple/chat";
import { injectable } from "inversify";
import { AuthProvider } from "./AuthProvider.ts";

@injectable()
export class TwitchChatClient {
  private chatClient?: ChatClient;
  public test: number = 0;

  constructor(
    private authProvider: AuthProvider,
  ) {}

  public async connect() {
    this.chatClient = new ChatClient({
      authProvider: this.authProvider.getAuthProvider(),
      channels: [String(Deno.env.get("CHANNEL_NAME"))],
    });

    await this.chatClient.connect();
    console.log("INFO: Chat conectado");
  }

  public getChatClient(): ChatClient {
    if (!this.chatClient) throw new Error("No chatClient");
    return this.chatClient;
  }
}
