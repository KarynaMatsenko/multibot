import { ITelegramBotEvents } from "../events";
import IBaseBotClient from "./IBaseBotClient";

export default interface ITelegramBot extends IBaseBotClient<ITelegramBotEvents, number> {
    readonly messenger: 'telegram';
}
