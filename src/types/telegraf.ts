// eslint-disable-next-line import/no-unresolved
import * as tt from 'telegraf/typings/telegram-types'
import { Update } from "telegraf/typings/core/types/typegram";
import { Context, NarrowedContext } from 'telegraf';
export { Middleware } from 'telegraf/typings/middleware'
export { Update, User } from "telegraf/typings/core/types/typegram";

export type TelegramUpdates = tt.UpdateType | tt.MessageSubType

/**
 * Maps [[`Composer.on`]]'s `updateType` to a `tt.Update` subtype.
 */
type MountMap = {
    [T in tt.UpdateType]: Extract<Update, Record<T, Record<string, unknown>>>
} &
{
    [T in tt.MessageSubType]: {
        message: Extract<Update.MessageUpdate['message'], Record<T, unknown>>
        update_id: number
    }
}

/** Takes: a context type and an update type (or message subtype).
    Produces: a context that has some properties required, and some undefined.
    The required ones are those that are always present when the given update (or message) arrives.
    The undefined ones are those that are always absent when the given update (or message) arrives. */
export type MatchedContext<
    C extends Context,
    T extends TelegramUpdates
> = NarrowedContext<C, MountMap[T]>

export type TelegramUpdateRecord<C extends Context = Context, T extends TelegramUpdates = TelegramUpdates> = { [Key in T]?: (...args: MatchedContext<C, Key>[]) => unknown; }

