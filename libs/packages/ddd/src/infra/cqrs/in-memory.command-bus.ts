import {
  CommandResponse,
  CommandNotRegisteredError,
  ICommand,
  ICommandBus,
  ICommandHandler,
  EmptyCommandHandlerError,
} from '../../domain'

export class InMemoryCommandBus implements ICommandBus {
  private readonly handlers: Map<string, ICommandHandler> = new Map()

  register(handlers: ICommandHandler[]) {
    handlers.forEach(h => {
      if (!h.subscription) throw EmptyCommandHandlerError.with(h)
      this.handlers.set(h.subscription.name, h)
    })
  }

  async dispatch<E extends Error>(command: ICommand): CommandResponse<E> {
    const handler = this.handlers.get(command.constructor.name)
    if (!handler) throw CommandNotRegisteredError.with(command)
    return await handler.handle(command)
  }
}
