require('dotenv').config();
import 'reflect-metadata';
import { container } from 'tsyringe';
import StartTwichServices from './Infrastructure/twitch/StartTwitchServices';
import express from 'express';
import Utils from './Application/Helpers/Utils';
import ObsClient from './Infrastructure/obs/ObsClient';

/** CLIENTS */
container.register<ObsClient>('ObsClientInterface', ObsClient);

const viewsPath = __dirname + '/Application/views/';
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

container.resolve(StartTwichServices).execute();
container.resolve<ObsClient>("ObsClientInterface").connect();