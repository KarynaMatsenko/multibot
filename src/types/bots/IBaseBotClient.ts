import IEvents from "../events/IEvents";
import Messenger from "../messenger";
import IBaseBot from "./IBaseBot";

export default interface IBaseBotClient<BotEvents extends IEvents = IEvents, IdType extends string | number = string | number> extends IBaseBot<BotEvents> {
    readonly messenger: Messenger;

    sendTextMessage(toId: IdType, text: string): Promise<void>;
}
