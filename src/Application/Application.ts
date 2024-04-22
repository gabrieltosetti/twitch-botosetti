import express from 'express';
import { container } from "tsyringe";
import ChatHandler from "../Domain/Events/Chat/ChatHandler";
import ObsClient from "../Infrastructure/obs/ObsClient";
import RedemptionHandler from "../Infrastructure/twitch/Events/Redemption/RedemptionHandler";
import Utils from "./Helpers/Utils";
import ServiceProviders from "./config/ServiceProviders";
import TwitchManager from '../Infrastructure/twitch/TwitchManager';
import AuthProvider from '../Infrastructure/twitch/AuthProvider';

export default class Application {
    public static async start(): Promise<void> {
        ServiceProviders.register();

        await container.resolve(AuthProvider).authenticate();
        await container.resolve<TwitchManager>("StreamManagerInterface").connect();
        await container.resolve<ObsClient>('ObsClientInterface').connect();
        this.startHandlers();

        const viewsPath = __dirname + '/views/';
        const PORT = process.env.PORT || 80;

        const app = express();
        const router = express.Router();

        /*
        ================================
        MIDDLEWARES
        ================================
        */

        app.use(express.json());
        app.use(express.static(viewsPath));
        app.use("/", router);

        router.use(function (req, res, next) {
            console.log("/" + req.method);
            next();
        });

        /*
        ================================
        ROTAS
        ================================
        */

        router.get("/", function (req, res) {
            console.log(viewsPath + "index/index.html");
            res.sendFile(viewsPath + "index/index.html");
        });

        router.get("/stream", function (req, res) {
            console.log("stream");
            res.setHeader('Content-Type', 'text/event-stream');

            Utils.activeResponse = res;
        });

        app.listen(PORT, function () {
            console.log(`Example app listening on port ${PORT}!`)
        })
    }

    private static startHandlers(): void {
        container.resolve(ChatHandler).register();
        container.resolve(RedemptionHandler).register();
    }

}