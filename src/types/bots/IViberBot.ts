import { IViberBotEvents } from "../events";
import IBaseBotClient from "./IBaseBotClient";

export default interface IViberBot extends IBaseBotClient<IViberBotEvents> {
    readonly messenger: 'viber';
}
