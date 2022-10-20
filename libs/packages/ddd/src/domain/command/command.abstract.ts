import { Constructor, IMessage, IPayload, Payload } from '../../domain'

export abstract class ICommand<P extends IPayload = IPayload>
  implements IMessage<P>
{
  constructor(public readonly payload: P) {}
}

export abstract class Command<
  P extends IPayload = IPayload
> extends ICommand<P> {
  /**
   * Creates a new Command from payload and aggregateId
   * @factory
   */
  static with<C extends ICommand = ICommand>(payload: Payload<C>): C {
    return Reflect.construct(this, [payload])
  }
}

export interface ICommandFactory<P extends IPayload = IPayload> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  with: (payload: P) => any
}

export type CommandClass<P extends IPayload = IPayload> = Constructor &
  ICommandFactory<P>
