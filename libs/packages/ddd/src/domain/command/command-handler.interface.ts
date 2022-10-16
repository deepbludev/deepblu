import { CommandClass, ICommand } from './command.abstract'

export interface ICommandHandler<C extends ICommand = ICommand> {
  subscription: CommandClass
  handle(command: C): Promise<void>
}
