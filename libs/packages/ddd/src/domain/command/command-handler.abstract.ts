import { Result } from '../core/result'
import { Constructor } from '../types'
import { ICommand } from './command.abstract'

export type CommandResponse<E extends Error = Error> = Promise<Result<void, E>>

export abstract class ICommandHandler<C extends ICommand = ICommand> {
  static readonly subscription: Constructor<ICommand>

  get subscription(): Constructor<ICommand> {
    return (this.constructor as typeof ICommandHandler).subscription
  }

  abstract handle(command: C): CommandResponse
}
