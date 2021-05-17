import { ITextMessage } from "../messages/text";

export default interface IBotEvents {
    'text-message': [textMessage: ITextMessage];
}
