import { ChatAbstract } from "./Chat/ChatAbstract";

export abstract class EventFactory {
    protected static eventClasses: any;

    static getEventClassFromString(eventClass: string): ChatAbstract {
        if (this.eventClasses[eventClass] === undefined || this.eventClasses[eventClass] === null) {
            throw new Error(`Class type of \'${eventClass}\' not found`);
        }

        return new this.eventClasses[eventClass]();
    }
}