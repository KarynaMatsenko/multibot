import { IMainBotEvents } from "../events";
import { BotsRecord } from '../../classes/MainBot'
import IBaseBot from "./IBaseBot";
import Messenger from "../messenger";

interface IMainBot<ProvidedMessengers extends Messenger> extends IBaseBot<IMainBotEvents> {
    bots: BotsRecord<ProvidedMessengers>;
}

export default IMainBot;
