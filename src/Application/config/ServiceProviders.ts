import { container } from "tsyringe";
import ObsClient from "../../Infrastructure/obs/ObsClient";
import TenorHttpClient from "../../Infrastructure/HttpsClients/TenorHttpClient";
import TwitchManager from "../../Infrastructure/twitch/TwitchManager";

export default class ServiceProviders {
    public static async register() {
        container.registerSingleton<ObsClient>('ObsClientInterface', ObsClient);
        container.registerSingleton<TenorHttpClient>('GifRepositoryInterface', TenorHttpClient);
        container.registerSingleton<TwitchManager>('StreamManagerInterface', TwitchManager);
    }
}