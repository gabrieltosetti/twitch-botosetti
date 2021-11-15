const path = require('path');

const envPath = path.resolve(__dirname, '../../.env');
require('dotenv').config({ path: envPath });

const stardewValleyService = require('./../Services/stardewValleyService');

const start = async function() {
    await stardewValleyService.updateStreamTitleByInGameDaysCount();
    setTimeout(start, 15000);
}

start();
