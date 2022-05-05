'use strict';

import { obsClient } from './obsClient';

export async function startObsService() {
    await obsClient.connect();
}