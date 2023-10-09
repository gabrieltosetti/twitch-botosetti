'use strict';

require('dotenv').config();
import { startTwichServices } from './Infrastructure/twitch/StartTwitchServices';
import express from 'express';
import Utils from './Application/Helpers/utils';
import { startObsService } from './Infrastructure/obs/StartObsService';

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

startTwichServices();
startObsService();
