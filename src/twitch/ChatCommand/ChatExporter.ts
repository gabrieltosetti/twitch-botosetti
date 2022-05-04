'use strict';

import { AbstractChatCommand } from './AbstractChatCommand';
import { Gif } from './Gif';

export function* getChatCommand(message: string, user: string): Generator<AbstractChatCommand, void, unknown> {
    yield new Gif(message, user);
}
