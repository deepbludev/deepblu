import { Result } from '../core/result'
import { Constructor } from '../types'
import { ICommand } from './command.abstract'

export interface ICommandHandler<C extends ICommand = ICommand> {
  subscription: Constructor<ICommand>
  handle<E extends Error = Error>(command: C): Promise<Result<void, E>>
}
