import IBaseConfiguration from "./IBaseConfiguration";

export default interface IWhatsAppConfiguration extends IBaseConfiguration {
    messenger: 'whatsapp';
    sid: string;
    botId: string;
}
