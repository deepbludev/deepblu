/* eslint-disable @typescript-eslint/no-explicit-any */

import { Constructor } from './constructor.interface'

/**
 * Base interface for application messages.
 * Used to define domain events in DDD, and commands/queries in CQRS.
 */
export abstract class IMessage<P = any> {
  constructor(public readonly payload: P) {}
}

/**
 * Extracts the payload type from a message class.
 * @example
 * class MyMessage implements IMessage<{ foo: string }> {
 *   constructor(public readonly payload: { foo: string }) {}
 * }
 * type MyMessagePayload = Payload<typeof MyMessage> // { foo: string }
 *
 * @example
 */

export type Payload<E extends Constructor<IMessage>> =
  ConstructorParameters<E>[0]
