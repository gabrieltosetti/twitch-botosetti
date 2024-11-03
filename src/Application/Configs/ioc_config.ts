import "reflect-metadata";

import { Container } from "inversify";
import type { ObsClientInterface } from "../../Domain/Contracts/ObsClientInterface.ts";
import type { GifRepositoryInterface } from "../../Domain/Repositories/GifRepositoryInterface.ts";
import { RotateCameraUseCase } from "../../Domain/UseCases/RotateCameraUseCase.ts";
import { TenorHttpClient } from "../../Infrastructure/HttpsClients/TenorHttpClient.ts";
import { ObsClient } from "../../Infrastructure/obs/ObsClient.ts";
import { AuthProvider } from "../../Infrastructure/twitch/AuthProvider.ts";
import { ChatHandler } from "../../Infrastructure/twitch/Events/Chat/ChatHandler.ts";
import { AlertChat } from "../../Infrastructure/twitch/Events/Chat/Impl/AlertChat.ts";
import { GifChat } from "../../Infrastructure/twitch/Events/Chat/Impl/GifChat.ts";
import { RotateCameraRedemption } from "../../Infrastructure/twitch/Events/Redemption/Impl/RotateCameraRedemption.ts";
import { RedemptionHandler } from "../../Infrastructure/twitch/Events/Redemption/RedemptionHandler.ts";
import { StartTwichServices } from "../../Infrastructure/twitch/StartTwitchServices.ts";
import { TwitchChatClient } from "../../Infrastructure/twitch/TwitchChatClient.ts";
import { TwitchPubSubClient } from "../../Infrastructure/twitch/TwitchPubSubClient.ts";
import { TYPES } from "./Types.ts";

const container = new Container({ defaultScope: "Singleton" });

container.bind<GifRepositoryInterface>(TYPES.GifRepositoryInterface).to(TenorHttpClient);
container.bind<ObsClientInterface>(TYPES.ObsClientInterface).to(ObsClient);

container.bind(StartTwichServices).toSelf();
container.bind(AuthProvider).toSelf();
container.bind(TwitchPubSubClient).toSelf();
container.bind(TwitchChatClient).toSelf();
container.bind(ChatHandler).toSelf();
container.bind(RedemptionHandler).toSelf();
container.bind(GifChat).toSelf();
container.bind(AlertChat).toSelf();
container.bind(RotateCameraRedemption).toSelf();
container.bind(RotateCameraUseCase).toSelf();


export default container;
