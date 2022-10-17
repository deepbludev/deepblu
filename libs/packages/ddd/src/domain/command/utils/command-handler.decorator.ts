import { Constructor } from '../../types'
import { ICommandHandler } from '../command-handler.interface'
import { ICommand } from '../command.abstract'

export const commandHandler = (command: Constructor<ICommand>) =>
  function <
    T extends Constructor<ICommandHandler> & {
      subscription: Constructor<ICommand>
    }
  >(CommandHandlerClass: T) {
    CommandHandlerClass.subscription = command
  }
