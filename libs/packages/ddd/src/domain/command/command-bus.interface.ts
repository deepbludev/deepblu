import { CommandResponse } from './command-handler.interface'
import { ICommand } from './command.abstract'

export interface ICommandBus {
  dispatch<E extends Error>(command: ICommand): CommandResponse<E>
}
