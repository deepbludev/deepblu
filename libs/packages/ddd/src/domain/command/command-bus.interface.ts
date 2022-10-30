import { CommandResponse } from './command-handler.abstract'
import { ICommand } from './command.abstract'

export abstract class ICommandBus {
  abstract dispatch(command: ICommand): CommandResponse
}
