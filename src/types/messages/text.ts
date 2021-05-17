import Messenger from "../messenger";
import { BaseMessages, ITelegramBaseMessage, IViberBaseMessage } from "./base";

type TextMessageBuilder<BaseMessage extends BaseMessages> = BaseMessage & { content: string };

export type ITelegramTextMessage = TextMessageBuilder<ITelegramBaseMessage>;

export type IViberTextMessage = TextMessageBuilder<IViberBaseMessage>;

type TextMessages = ITelegramTextMessage | IViberTextMessage

export type ITextMessage<UsedMessenger extends Messenger = Messenger> = Extract<TextMessages, { messenger: UsedMessenger }>;
