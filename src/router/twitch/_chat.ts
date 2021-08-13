import tmi from "tmi.js";
import gifCommand from "./commands/gif";
import participarCommand from "./commands/participar";

const opts = {
  identity: {
    username: process.env.BOT_NAME!,
    password: process.env.BOT_OAUTH_TOKEN!,
  },
  channels: [process.env.CHANNEL_NAME!],
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on("message", (target, context, msg, self) => {
  const commandName = msg.trim();

  if (commandName.indexOf("!gif ") === 0) {
    return gifCommand(commandName.substring(5));
  }

  if (commandName.indexOf("!participar") === 0) {
    return participarCommand(context);
  }
});

client.on("connected", (addr, port) => {
  console.log(`* Connected to ${addr}:${port}`);
});

// Connect to Twitch:
client.connect();
