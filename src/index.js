'use strict';

const https = require('https');
const express = require("express");
const app = express();
const router = express.Router();
const utils = require('./utils.js')

const path = __dirname + '/views/';
const PORT = process.env.PORT || 80;
const tenorKey = process.env.TENOR_GIF_API_KEY;
let activeResponse = undefined;
let posicaoAtual = 1;

router.use(function (req, res, next) {
  console.log("/" + req.method);
  next();
});

router.get("/", function (req, res) {
  console.log(path + "index/index.html");
  res.sendFile(path + "index/index.html");
});

router.get("/stream", function (req, res) {
  res.setHeader('Content-Type', 'text/event-stream');

  activeResponse = res;
});


router.get("/random", function (req, res) {
  posicaoAtual = utils.getRandomGifPos(posicaoAtual, 1, 100);

  https.get(`https://g.tenor.com/v1/search?key=${tenorKey}&locale=pt_BR&q=fail&limit=1&pos=${posicaoAtual}&contentfilter=high`, (getRes) => {
    const { statusCode } = getRes;
    const contentType = getRes.headers['content-type'];

    let error;
    // Any 2xx status code signals a successful response but
    // here we're only checking for 200.
    if (statusCode !== 200) {
      error = new Error('Request Failed.\n' +
        `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error('Invalid content-type.\n' +
        `Expected application/json but received ${contentType}`);
    }

    if (error) {
      console.error(error.message);
      // Consume response data to free up memory
      getRes.send("error: " + error.message);
      return;
    }

    getRes.setEncoding('utf8');
    let rawData = '';
    getRes.on('data', (chunk) => { rawData += chunk; });
    getRes.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        const gifUrl = parsedData.results[0].media[0].gif.url;
        console.log(gifUrl);

        send(gifUrl);

        res.send({ msg: "Gif enviado" });
      } catch (e) {
        console.error(e.message);
      }
    });
  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  });
});

function send(data) {
  activeResponse.write(`data: ${data}\n\n`);
}

app.use(express.static(path));
app.use("/", router);

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`)
})
