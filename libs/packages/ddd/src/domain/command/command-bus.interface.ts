import { Result } from '../core/result'
import { ICommand } from './command.abstract'

export interface ICommandBus {
  dispatch<E extends Error>(command: ICommand): Promise<Result<void, E>>
}
