'use strict';
require('dotenv').config()
require('./twitch/connect');


const viewsPath = __dirname + '/views/';
const PORT = process.env.PORT || 80;

import express from 'express';
import Utils from './utils';

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
    res.setHeader('Content-Type', 'text/event-stream');

    Utils.activeResponse = res;
});


router.get("/stardew-valley", function (req, res) {

});

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`)
})
