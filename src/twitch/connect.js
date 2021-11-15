const tmi = require('tmi.js');
const utils = require('./../utils.js');
const https = require('https');

const PORT = process.env.PORT || 80;
const tenorKey = process.env.TENOR_GIF_API_KEY;

let posicaoAtual = 1;

// Define configuration options 
const opts = {
  identity: {
    username: process.env.BOT_NAME,
    password: process.env.BOT_OAUTH_TOKEN,
  },
  channels: [
    process.env.CHANNEL_NAME
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // TODO: str to lower
  const commandName = msg.trim();

  if (commandName === '!gif') {
    client.say(target, `Pesquise por qualquer gif! Use !gif <nome do gif>. Por exemplo: !gif rocket league`);
  }

  // If the command is known, let's execute it
  if (commandName.indexOf('!gif ') === 0) {

    let pesquisaGif = commandName.substring(5);

    // client.say(target, `Voce pediu o gif ${pesquisaGif}`);
    // console.log(`* Executed ${commandName} command`);

    
    posicaoAtual = utils.getRandomGifPos(posicaoAtual, 1, 5);

    
    pesquisaGif = encodeURI(pesquisaGif);

    let url = `https://g.tenor.com/v1/search?key=${tenorKey}&locale=pt_BR&q=${pesquisaGif}&limit=1&pos=${posicaoAtual}&contentfilter=high`;

    https.get(url, (getRes) => {
    
        getRes.setEncoding('utf8');
        let rawData = '';
        getRes.on('data', (chunk) => { rawData += chunk; });
        getRes.on('end', () => {
          try {
            const parsedData = JSON.parse(rawData);
            const gifUrl = parsedData.results[0].media[0].gif.url;
            console.log(gifUrl);
    
            utils.responseWrite(gifUrl);
          } catch (e) {
            console.error(e.message);
          }
        });
      }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
      });
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}