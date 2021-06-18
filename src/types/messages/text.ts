import Messenger from "../messenger";
import { BaseMessages, ITelegramBaseMessage, IViberBaseMessage, IWhatsAppBaseMessage } from "./base";

type TextMessageBuilder<BaseMessage extends BaseMessages> = BaseMessage & { content: string };

export type ITelegramTextMessage = TextMessageBuilder<ITelegramBaseMessage>;

export type IViberTextMessage = TextMessageBuilder<IViberBaseMessage>;

export type IWhatsAppTextMessage = TextMessageBuilder<IWhatsAppBaseMessage>;

type TextMessages = ITelegramTextMessage | IViberTextMessage | IWhatsAppTextMessage;

export type ITextMessage<UsedMessenger extends Messenger = Messenger> = Extract<TextMessages, { messenger: UsedMessenger }>;
