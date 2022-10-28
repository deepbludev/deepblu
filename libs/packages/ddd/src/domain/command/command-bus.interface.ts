import { CommandResponse } from './command-handler.abstract'
import { ICommand } from './command.abstract'

export abstract class ICommandBus {
  abstract dispatch<E extends Error>(command: ICommand): CommandResponse<E>
}
