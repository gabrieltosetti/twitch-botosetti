import { RefreshingAuthProvider } from "@twurple/auth";
import { injectable } from "inversify";

@injectable()
export class AuthProvider {
  private authProvider?: RefreshingAuthProvider;

  public async authenticate() {
    const clientId = Deno.env.get("BOT_CLIENT_ID") || "";
    const clientSecret = Deno.env.get("BOT_CLIENT_SECRET") || "";

    const tokenData = JSON.parse(await Deno.readTextFile("./tokens.json"));
    this.authProvider = new RefreshingAuthProvider(
      {
        clientId,
        clientSecret,
        onRefresh: async (newTokenData) =>
          await Deno.writeTextFile(
            "./tokens.json",
            JSON.stringify(newTokenData, null, 4),
          ),
      },
      tokenData,
    );
  }

  public getAuthProvider(): RefreshingAuthProvider {
    if (!this.authProvider) throw new Error("No auth provider");
    return this.authProvider;
  }
}
