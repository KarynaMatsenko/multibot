import IEvents from "../events/IEvents";
import Messenger from "../messenger";
import IBaseBot from "./IBaseBot";

export default interface IBaseBotClient<BotEvents extends IEvents = IEvents> extends IBaseBot<BotEvents> {
    readonly messenger: Messenger;

    sendTextMessage(toId: string | number, text: string): Promise<void>;
}
