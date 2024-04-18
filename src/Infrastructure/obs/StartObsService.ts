'use strict';

import { obsClient } from './ObsClient';

export async function startObsService() {
    await obsClient.connect();
}