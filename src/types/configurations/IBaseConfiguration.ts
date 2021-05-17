import Messenger from "../messenger";

export default interface IBaseConfiguration {
    messenger: Messenger;
    webhook: {
        hostUrl: string;
        path: string;
    };
    token: string;
}
