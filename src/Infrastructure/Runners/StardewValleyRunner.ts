import path from 'path';
import dotenv from 'dotenv';

const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

import * as stardewValleyService from '../../Domain/Services/stardewValleyService';

async function start() {
    await stardewValleyService.updateStreamTitleByInGameDaysCount();
    setTimeout(start, 120000);
}

start();
