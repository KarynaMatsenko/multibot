import express from "express";
import { IncomingMessage, ServerResponse } from "http";
import { IBotEventEmitter } from "../types/botEventEmitter";
import { IBot, IMainBot } from "../types/bots";
import { BotConfigurations } from "../types/configurations";
import IContext from "../types/context";
import { IBotEvents, IMainBotEvents } from "../types/events";
import { IBaseMessage } from "../types/messages/base";
import { ITextMessage } from "../types/messages/text";
import Messenger from "../types/messenger";
import { TelegramBot, ViberBot } from "./bots";
import BaseBot from "./bots/BaseBot";

type EventsRecord = { [Key in keyof IBotEvents]: (message: IBotEvents[Key][0], bot: IBot) => unknown; }
export type BotsRecord = { [Key in Messenger]?: IBot<Key> };

export default class MainBot extends BaseBot<IMainBotEvents> implements IMainBot {
    readonly messenger = 'main';

    private _bots: BotsRecord;
    private _config: BotConfigurations[];

    public get bots(): BotsRecord {
        return this._bots;
    }

    public constructor(config: BotConfigurations[]) {
        super();
        this._config = config;
        this._bots = this._createBots();
    }

    public getMiddleware = (): (req: IncomingMessage, res: ServerResponse, next?: () => void) => void => {
        const app = express();
        for (const [botType, bot] of Object.entries(this._bots)) {
            if (!bot) continue;
            const configuration = this._config.find((value) => value.messenger === botType) as BotConfigurations;
            app.use((req, res, next) => {
                console.log(req);
                bot.getMiddleware()(req, res, next);
            });
        }
        return app;
    };

    protected _registerEvent = (eventName: string, listener: (message: IBaseMessage, bot: IBot) => void): void => {
        for (const bot of Object.values(this._bots)) {
            if (bot) {
                (bot as IBotEventEmitter<IBotEvents>).on(eventName as keyof IBotEvents, (textMessage) => {
                    console.log(textMessage);
                    listener(textMessage, bot);
                });
            }
        }
    }

    private _createBots = (): BotsRecord => {
        const bots: BotsRecord = {};
        for (const configuration of this._config) {
            switch (configuration.messenger) {
                case 'telegram':
                    bots.telegram = new TelegramBot(configuration);
                    bots.telegram.start();
                    break;
                case 'viber':
                    bots.viber = new ViberBot(configuration);
                    bots.viber.start();
                    break;
                default:
                    throw new Error('wrong configuration');
                    break;
            }
        }
        return bots;
    }

    private _onText = (textMessage: ITextMessage, bot: IBot): void => {
        const context: IContext<IBot, ITextMessage> = {
            bot,
            message: textMessage,
        }
        this.emit('text-message', context);
    }

    protected _botEvents: EventsRecord = {
        'text-message': this._onText,
    };
}