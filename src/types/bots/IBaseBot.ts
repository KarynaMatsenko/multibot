import { IncomingMessage, ServerResponse } from "http";
import { IBotEventEmitter } from "../botEventEmitter";
import IEvents from "../events/IEvents";

export default interface IBaseBot<BotEvents extends IEvents = IEvents> extends IBotEventEmitter<BotEvents> {
    getMiddleware(): (req: IncomingMessage, res: ServerResponse, next?: () => void) => void;
    start(): Promise<this>;
}