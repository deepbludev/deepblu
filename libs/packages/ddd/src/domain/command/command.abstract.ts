import { Constructor, IMessage, IPayload, Payload } from '../../domain'

export abstract class Command<P extends IPayload = IPayload>
  implements ICommand<P>
{
  constructor(public readonly payload: P) {}
  /**
   * Creates a new DomainEvent from payload and aggregateId
   * @factory
   */
  static with<C extends ICommand = ICommand>(payload: Payload<C>): C {
    return Reflect.construct(this, [payload])
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICommand<P extends IPayload = IPayload> extends IMessage<P> {}

export interface ICommandFactory<P extends IPayload = IPayload> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  with: (payload: P) => any
}

export type CommandClass<P extends IPayload = IPayload> = Constructor &
  ICommandFactory<P>
