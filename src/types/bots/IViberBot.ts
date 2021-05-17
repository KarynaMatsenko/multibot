import { IViberBotEvents } from "../events";
import IBaseBotClient from "./IBaseBotClient";

export default interface IViberBot extends IBaseBotClient<IViberBotEvents, string> {
    readonly messenger: 'viber';
}
