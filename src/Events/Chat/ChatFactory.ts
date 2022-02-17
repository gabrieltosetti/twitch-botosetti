import { EventFactory } from "../EventFactory";
import { Gif } from "./Gif";

export class ChatFactory extends EventFactory {
    protected static eventClasses: any = {
        Gif
    };
}