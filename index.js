'use strict';

const https = require('https');
const express = require("express");
const app = express();
const router = express.Router();

const path = __dirname + '/views/';
const PORT = process.env.PORT || 80;
const tenorKey = process.env.TENOR_GIF_API_KEY;
let activeResponse = undefined;
let gifPos = 1;

router.use(function (req, res, next) {
  console.log("/" + req.method);
  next();
});

router.get("/", function (req, res) {
  res.sendFile(path + "index.html");
});

router.get("/stream", function (req, res) {
  res.setHeader('Content-Type', 'text/event-stream');

  activeResponse = res;
});


router.get("/random", function (req, res) {
  gifPos = getRandomGifPos(1, 100);

  https.get(`https://g.tenor.com/v1/search?key=${tenorKey}&locale=pt_BR&q=penis&limit=1&pos=${gifPos}`, (getRes) => {
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

        res.send({msg: "Gif enviado"});
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

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
 function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomGifPos(min, max) {
  let randomPos = getRandomInt(min, max);

  if (randomPos === gifPos) {
    return getRandomGifPos(min, max);
  }

  return randomPos;
}