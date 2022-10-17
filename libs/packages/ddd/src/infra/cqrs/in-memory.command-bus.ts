import {
  CommandResponse,
  CommandNotRegisteredError,
  ICommand,
  ICommandBus,
  ICommandHandler,
} from '../../domain'

export class InMemoryCommandBus implements ICommandBus {
  private readonly handlers: Map<string, ICommandHandler> = new Map()

  register(handlers: ICommandHandler[]) {
    handlers.forEach(handler => {
      this.handlers.set(handler.subscription.name, handler)
    })
  }

  async dispatch<E extends Error>(command: ICommand): CommandResponse<E> {
    const handler = this.handlers.get(command.constructor.name)
    if (!handler) throw CommandNotRegisteredError.with(command)
    return await handler.handle(command)
  }
}
