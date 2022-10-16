// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IPayload {}

/**
 * Base interface for application messages.
 * Used to define domain events in DDD, and commands/queries in CQRS.
 */
export interface IMessage<P extends IPayload = IPayload> {
  payload: P
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

export type Payload<E extends IMessage> = E['payload']
