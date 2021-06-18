import { ITelegramBotEvents } from "../events";
import IBaseBotClient from "./IBaseBotClient";

export default interface ITelegramBot extends IBaseBotClient<ITelegramBotEvents> {
    readonly messenger: 'telegram';
}
