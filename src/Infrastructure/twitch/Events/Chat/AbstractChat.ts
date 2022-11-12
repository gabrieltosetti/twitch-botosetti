'use strict';

import { chatClient } from "../../chatClient";

export abstract class AbstractChat {
    protected message: string;
    protected user: string;
    protected channel: string;

    public constructor(message: string, user: string, channel: string) {
        this.message = message;
        this.user = user;
        this.channel = channel;
    }

    public abstract isValid(): boolean;

    public abstract handle(): void;

    protected chatSay(message: string) {
        return chatClient.getChatClient().say(this.channel, message);
    }
}