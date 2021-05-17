import IBaseConfiguration from "./IBaseConfiguration";

export default interface IViberConfiguration extends IBaseConfiguration {
    messenger: 'viber';
    name: string;
    avatarURL: string;
}
