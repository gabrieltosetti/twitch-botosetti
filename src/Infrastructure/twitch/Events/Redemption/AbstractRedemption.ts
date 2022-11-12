'use strict';

import { PubSubRedemptionMessage } from "@twurple/pubsub/lib/messages/PubSubRedemptionMessage";

export abstract class AbstractRedemption
{
    protected redemption: PubSubRedemptionMessage;
    protected abstract rewardId: string;

    public constructor(redemption: PubSubRedemptionMessage)
    {
        this.redemption = redemption;
    }

    public abstract isValid(): boolean;

    public abstract handle(): void;
}