import {
  Constructor,
  IMessage,
  IMessageFactory,
  IPayload,
  Payload,
} from '../../domain'

export abstract class ICommand<
  P extends IPayload = IPayload
> extends IMessage<P> {
  /**
   * Creates a new command from payload
   * @factory
   */
  static override with<C extends IMessage = ICommand>(payload: Payload<C>): C {
    return super.with<C>(payload)
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICommandFactory<P extends IPayload = IPayload>
  extends IMessageFactory<P, ICommand<P>> {}

export type CommandClass<P extends IPayload = IPayload> = Constructor &
  ICommandFactory<P>
