import IBaseBotClient from './IBaseBotClient';
import IViberBot from './IViberBot';
import ITelegramBot from './ITelegramBot';
import IMainBot from './IMainBot';
import Messenger from '../messenger';

type BotClients = IViberBot | ITelegramBot;
type IBot<UsedMessenger extends Messenger = Messenger> = Extract<BotClients, { messenger: UsedMessenger }>;

export { IBaseBotClient, IViberBot, ITelegramBot, IMainBot, BotClients, IBot };
