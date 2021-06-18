import { IWhatsAppBotEvents } from "../events";
import IBaseBotClient from "./IBaseBotClient";

export default interface IWhatsAppBot extends IBaseBotClient<IWhatsAppBotEvents> {
    readonly messenger: 'whatsapp';
}
