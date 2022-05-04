import { startTwichServices } from './twitch/StartTwitchServices';
require('dotenv').config();

async function main() {
    await startTwichServices();
}

main();