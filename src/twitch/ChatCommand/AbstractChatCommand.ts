'use strict';

export abstract class AbstractChatCommand
{
    protected message: string;
    protected user: string;

    public constructor(message: string, user: string)
    {
        this.message = message;
        this.user = user;
    }

    public abstract isValid(): boolean;

    public abstract handle(): void;
}