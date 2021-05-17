import { IMainBotEvents } from "../events";
import { BotsRecord } from '../../classes/MainBot'
import IBaseBot from "./IBaseBot";

interface IMainBot extends IBaseBot<IMainBotEvents> {
    bots: BotsRecord;
}

export default IMainBot;
