import bodyParser from "body-parser";
import express, { Express } from "express";
import { IncomingMessage, ServerResponse } from "http";
import twilio, { Twilio } from "twilio";
import { IWhatsAppBot } from "../../types/bots";
import { IWhatsAppConfiguration } from "../../types/configurations";
import { IWhatsAppBotEvents } from "../../types/events";
import { IWhatsAppTextMessage } from "../../types/messages/text";
import BaseBot from "./BaseBot";

export default class WhatsAppBot extends BaseBot<IWhatsAppBotEvents> implements IWhatsAppBot {
    public readonly messenger = 'whatsapp';
    
    private _config: IWhatsAppConfiguration;
    private _twilio: Twilio;
    private _express: Express;

    public constructor(config: IWhatsAppConfiguration) {
        super();
        this._config = config;
        this._twilio = twilio(config.sid, config.token);
        this._express = this._createExpressApp();
    }

    public sendTextMessage = async (toId: string | number, content: string): Promise<void> => {
        let id: string;
        if (typeof toId === 'number') {
            id = `whatsapp:+${toId}`;
        } else {
            id = toId;
        }
        await this._twilio.messages.create({ from: this._config.botId, to: id, body: content, });
    }

    public getMiddleware = (): (req: IncomingMessage, res: ServerResponse, next?: () => void) => void => {
        return this._express;
    }

    protected _registerEvent = (_eventName: string, listener: (...args: unknown[]) => void): void => {
        this._express.post(this._config.webhook.path, (req, res) => {
            listener(req.body);
            res.status(200).send('Ok');
        });
    }

    private _createExpressApp = (): Express => {
        const app = express();
        app.use(bodyParser.urlencoded({ extended: false }));
        return app;
    }

    private _onText = (message: any): void => {
        const textMessage: IWhatsAppTextMessage = {
            messenger: 'whatsapp',
            id: message.MessageSid,
            from: {
                id: message.From,
                username: message.ProfileName,
            },
            date: new Date(),
            content: message.Body,
        }
        this.emit('text-message', textMessage);
    }

    protected _botEvents = {
        'message': this._onText,
    };
}
