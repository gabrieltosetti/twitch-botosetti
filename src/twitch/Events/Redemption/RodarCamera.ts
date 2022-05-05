'use strict';

import { obsClient } from "../../../obs/obsClient";
import { AbstractRedemption } from "./AbstractRedemption";

export class RodarCamera extends AbstractRedemption
{
    protected rewardId: string = '3c546d54-0cab-4404-9455-b5b8138bd0c0';

    public isValid(): boolean {
        return this.redemption.rewardId === this.rewardId;
    }

    public handle(): void {
        console.log('reward rodar camera');

        obsClient.rodarCamera(180);

        setTimeout(() => obsClient.rodarCamera(0), 60000);
    }
}