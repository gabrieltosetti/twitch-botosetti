'use strict';

import { AbstractChatCommand } from "./AbstractChatCommand";

export class Gif extends AbstractChatCommand
{
    public isValid(): boolean
    {
        return (this.message === '!gif');
    }

    public handle(): void
    {
        console.log('giiiiiiiif');
        return;
    }
}