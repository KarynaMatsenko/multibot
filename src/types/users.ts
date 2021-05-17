export interface IUser<IdType = string | number> {
    id: IdType;
    username: string;
}

export interface ITelegramUser extends IUser<number> {
    firstName: string;
    lastName?: string;
}
