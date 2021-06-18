import express from "express";
import { IncomingMessage, ServerResponse } from "http";
import { IBotEventEmitter } from "../types/botEventEmitter";
import { BotClients, IBot, IMainBot } from "../types/bots";
import { BotConfigurations } from "../types/configurations";
import IContext from "../types/context";
import { IBotEvents, IMainBotEvents } from "../types/events";
import { IBaseMessage } from "../types/messages/base";
import { ITextMessage } from "../types/messages/text";
import Messenger from "../types/messenger";
import { BotClasses, TelegramBot, ViberBot, WhatsAppBot } from "./bots";
import BaseBot from "./bots/BaseBot";

type TypedBotConfiguration<ProvidedMessenger extends Messenger> = Extract<BotConfigurations, { messenger: ProvidedMessenger }>;

type EventsRecord = { [Key in keyof IBotEvents]: (message: IBotEvents[Key][0], bot: IBot) => unknown; }
export type BotsRecord<ProvidedMessengers extends Messenger> = { [Key in ProvidedMessengers]: IBot<Key> };

export default class MainBot<Configurations extends Messenger> extends BaseBot<IMainBotEvents> implements IMainBot<Configurations> {
    readonly messenger = 'main';

    private _bots: BotsRecord<Messenger>;
    private _config: BotConfigurations[];

    public get bots(): BotsRecord<Configurations> {
        return this._bots;
    }

    public constructor(config: TypedBotConfiguration<Configurations>[]) {
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
        for (const bot of Object.values(this._bots) as BotClients[]) {
            if (bot) {
                (bot as IBotEventEmitter<IBotEvents>).on(eventName as keyof IBotEvents, (textMessage) => {
                    console.log(textMessage);
                    listener(textMessage, bot);
                });
            }
        }
    }

    private _createBots = (): BotsRecord<Messenger> => {
        const bots: BotsRecord<Messenger> = {} as BotsRecord<Messenger>;
        for (const configuration of this._config) {
            let classType: BotClasses;
            switch (configuration.messenger) {
                case 'telegram':
                    classType = TelegramBot;
                    break;
                case 'viber':
                    classType = ViberBot;
                    break;
                case 'whatsapp':
                    classType = WhatsAppBot;
                    break;
                default:
                    throw new Error('wrong configuration');
                    break;
            }
            const bot = new classType(configuration as never);
            bot.start();
            (bots[bot.messenger] as BotClients) = bot;
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