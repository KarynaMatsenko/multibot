import { BaseMessages } from "./messages/base";
import Messenger from "./messenger";

export type Arguments<ArgumentArray> = ArgumentArray extends unknown[] ? ArgumentArray : never;
export type ObjectKeys<Keys> = Keys extends keyof Record<string, unknown> ? Keys : never;

export type MessageType<UsedMessenger extends Messenger = Messenger> = Extract<BaseMessages, { messenger: UsedMessenger }>;
