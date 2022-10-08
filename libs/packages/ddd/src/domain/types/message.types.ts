/* eslint-disable @typescript-eslint/no-explicit-any */

import { Constructor } from './constructor.interface'

/**
 * Base interface for application messages.
 * Used to define domain events in DDD, and commands/queries in CQRS.
 */
export interface IMessage<
  P extends Record<string, unknown> = Record<string, unknown>
> {
  name: string
  payload: P
}

/**
 * Extracts the payload type from a message class.
 * @example
 * class MyMessage implements IMessage<{ foo: string }> {
 *  name = 'MyMessage'
 *  payload: { foo: string }
 * }
 * type MyMessagePayload = Payload<typeof MyMessage> // { foo: string }
 * @example
 */
export type Payload<E extends Constructor<IMessage>> =
  ConstructorParameters<E>[1]
