import IBaseConfiguration from './IBaseConfiguration';
import ITelegramConfiguration from './ITelegramConfiguration';
import IViberConfiguration from './IViberConfiguration';

type BotConfigurations = ITelegramConfiguration | IViberConfiguration;

export { IBaseConfiguration, ITelegramConfiguration, IViberConfiguration, BotConfigurations };
