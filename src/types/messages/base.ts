import Messenger from "../messenger";
import { ITelegramUser, IUser } from "../users";

export interface IBaseMessage<IdType extends string | number = string | number, User extends IUser<IdType> = IUser<IdType>, UsedMessenger extends Messenger = Messenger> {
    messenger: UsedMessenger;
    id: IdType;
    from: User;
    date: Date;
}

export type ITelegramBaseMessage = IBaseMessage<number, ITelegramUser, 'telegram'>;
export type IViberBaseMessage = IBaseMessage<string, IUser<string>, 'viber'>;
export type IWhatsAppBaseMessage = IBaseMessage<string, IUser<string>, 'whatsapp'>;

export type BaseMessages = ITelegramBaseMessage | IViberBaseMessage | IWhatsAppBaseMessage;
