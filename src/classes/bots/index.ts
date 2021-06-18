import TelegramBot from './TelegramBot';
import ViberBot from './ViberBot';
import WhatsAppBot from './WhatsAppBot';
type BotClasses = typeof TelegramBot | typeof ViberBot | typeof WhatsAppBot;

export { TelegramBot, ViberBot, WhatsAppBot, BotClasses };
