import { IBotEvents } from ".";
import { IBot } from "../bots";
import IContext from "../context";

type IMainBotEvents = {
    [Key in keyof IBotEvents]: [context: IContext<IBot, IBotEvents[Key][0]>]
}

export default IMainBotEvents;