'use strict';

import { AbstractChat } from "./AbstractChat";

export class Gif extends AbstractChat {
    public isValid(): boolean {
        return (this.message === '!gif' || this.message.indexOf('!gif ') === 0);
    }

    public handle(): void {
        console.log('giiiiiiiif');
        return;
    }
}