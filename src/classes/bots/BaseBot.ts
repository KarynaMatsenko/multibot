import EventEmitter from "events";
import IEvents from "../../types/events/IEvents";
import { Arguments, ObjectKeys } from "../../types/helpers";

export default abstract class BaseBot<BotEvents extends IEvents> extends EventEmitter {
    protected abstract _botEvents: Record<string, (...args: any[]) => unknown>;
    
    public constructor() {
        super();
    }

    protected abstract _registerEvent: (eventName: string, listener: () => unknown) => void;

    protected _registerEvents = (): void => {
        for (const event of Object.entries(this._botEvents)) {
            this._registerEvent(...event);
        }
    }

    // public emit = <Key extends ObjectKeys<keyof BotEvents>>(event: Key, ...args: Arguments<BotEvents[Key]>): boolean => {
    //     return super.emit(event, ...args);
    // }

    public start = async (): Promise<this> => {
        this._registerEvents();
        return this;
    }
}
