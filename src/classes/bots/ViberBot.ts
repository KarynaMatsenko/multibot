import express from "express";
import { IncomingMessage, ServerResponse } from "http";
import { Bot, Response as ViberResponse, Message } from 'viber-bot';
import { IViberBot } from "../../types/bots";
import { IViberConfiguration } from "../../types/configurations";
import { IViberBotEvents } from "../../types/events";
import { IViberTextMessage } from "../../types/messages/text";
import BaseBot from "./BaseBot";

export default class ViberBot extends BaseBot<IViberBotEvents> implements IViberBot {
    public readonly messenger = 'viber';
    
    private _viberBot: Bot;
    private _config: IViberConfiguration;

    public constructor(config: IViberConfiguration) {
        super();
        this._config = config;
        this._viberBot = new Bot({ 
            authToken: config.token,
            name: config.name,
            avatar: config.avatarURL,
         });
        const { hostUrl, path } = config.webhook;
        this._viberBot.setWebhook(`${hostUrl}${path}`);
    }

    public sendTextMessage = async (toId: string | number, content: string): Promise<void> => {
        let id: string;
        if (typeof toId === 'number') {
            id = toId.toString();
        } else {
            id = toId;
        }
        await this._viberBot.sendMessage({ id }, [new (Message as any).Text(content)]);
    }

    public getMiddleware = (): (req: IncomingMessage, res: ServerResponse, next?: () => void) => void => {
        const app = express();
        app.use(this._config.webhook.path, this._viberBot.middleware());
        return app;
    }

    protected _registerEvent = (eventName: string, listener: () => void): void => {
        this._viberBot.on(eventName, listener);
    }

    private _onText = (message: any, response: ViberResponse): void => {
        const textMessage: IViberTextMessage = {
            messenger: 'viber',
            id: response.userProfile.id,
            from: {
                id: response.userProfile.id,
                username: response.userProfile.name,
            },
            date: new Date(),
            content: message.text,
        }
        this.emit('text-message', textMessage);
    }

    protected _botEvents = {
        'message': this._onText,
    };
}
