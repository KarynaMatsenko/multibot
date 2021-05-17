import { IBot } from "./bots";
import { IBaseMessage } from "./messages/base";

export default interface IContext<Bot extends IBot, Message extends IBaseMessage> {
    bot: Bot;
    message: Message;
}
