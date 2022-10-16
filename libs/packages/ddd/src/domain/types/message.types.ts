// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IPayload {}

/**
 * Base interface for application messages.
 * Used to define domain events in DDD, and commands/queries in CQRS.
 */
export abstract class IMessage<P extends IPayload = IPayload> {
  constructor(public readonly payload: P) {}

  /**
   * Creates a new message from payload
   * @factory
   */
  static with<
    M extends IMessage = IMessage
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  >(payload: Payload<IMessage>, ...args: any[]): M {
    return Reflect.construct(this, [payload, ...args])
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IMessageFactory<P extends IPayload = IPayload, R = any> {
  with: (payload: P) => R
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
