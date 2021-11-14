'use strict';
require('dotenv').config()
require('./twitch/connect');


const viewsPath = __dirname + '/views/';
const PORT = process.env.PORT || 80;

const express = require("express");
const utils = require('./utils.js');

const app = express();
const router = express.Router();

/*
================================
MIDDLEWARES
================================
*/

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

    utils.activeResponse = res;
});


router.get("/stardew-valley", function (req, res) {

});

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`)
})
