import { ICommand } from './command.abstract'

export interface ICommandBus {
  send(command: ICommand): Promise<void>
}
