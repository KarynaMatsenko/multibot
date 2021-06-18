import IBaseConfiguration from './IBaseConfiguration';
import ITelegramConfiguration from './ITelegramConfiguration';
import IViberConfiguration from './IViberConfiguration';
import IWhatsAppConfiguration from './IWhatsAppConfiguration';

type BotConfigurations = ITelegramConfiguration | IViberConfiguration | IWhatsAppConfiguration;

export { IBaseConfiguration, ITelegramConfiguration, IViberConfiguration, IWhatsAppConfiguration, BotConfigurations };
