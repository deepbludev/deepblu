import { CommandResponse } from './command-handler.abstract'
import { ICommand } from './command.abstract'

export interface ICommandBus {
  dispatch<E extends Error>(command: ICommand): CommandResponse<E>
}
