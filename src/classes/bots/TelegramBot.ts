import { IncomingMessage, ServerResponse } from "http";
import { Context, Telegraf } from 'telegraf';
import { ITelegramBot } from "../../types/bots";
import { ITelegramConfiguration } from "../../types/configurations";
import { ITelegramBotEvents } from "../../types/events";
import { ITelegramTextMessage } from "../../types/messages/text";
import { MatchedContext, TelegramUpdateRecord, TelegramUpdates, User } from "../../types/telegraf";
import BaseBot from "./BaseBot";

export default class TelegramBot extends BaseBot<ITelegramBotEvents> implements ITelegramBot {
    public readonly messenger = 'telegram';
    
    private _telegraf: Telegraf;
    private _config: ITelegramConfiguration

    public constructor(config: ITelegramConfiguration) {
        super();
        this._config = config;
        this._telegraf = new Telegraf(config.token, { telegram: { webhookReply: false } });
        const { hostUrl, path } = config.webhook;
        this._telegraf.telegram.setWebhook(`${hostUrl}${path}`);
    }

    public sendTextMessage = async (toId: string | number, content: string): Promise<void> => {
        let id: number;
        if (typeof toId === 'string') {
            id = Number.parseInt(toId, 10);
        } else {
            id = toId;
        }
        await this._telegraf.telegram.sendMessage(id, content);
    }

    public getMiddleware = (): (req: IncomingMessage, res: ServerResponse, next?: () => void) => void =>{
        return this._telegraf.webhookCallback(this._config.webhook.path);
    }

    protected _registerEvent = (eventName: string, listener: () => void): void => {
        this._telegraf.on(eventName as TelegramUpdates, (ctx) => {
            console.log(ctx);
            (listener as any)(ctx);
        });
    }

    private _getUsersFullName = (user: User) => user.last_name ? `${user.first_name} ${user.last_name}` : `${user.first_name}`;

    private _onText = (ctx: MatchedContext<Context, 'text'>): void => {
        if (ctx.from.is_bot) return;

        const textMessage: ITelegramTextMessage = {
            messenger: 'telegram',
            id: ctx.from.id,
            from: {
                id: ctx.from.id,
                username: ctx.from.username ?? this._getUsersFullName(ctx.from),
                firstName: ctx.from.first_name,
                lastName: ctx.from.last_name,
            },
            date: new Date(),
            content: ctx.message.text,
        }
        this.emit('text-message', textMessage);
    }

    protected _botEvents: TelegramUpdateRecord = {
        'text': this._onText,
    };
}
