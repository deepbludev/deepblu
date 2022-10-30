import { Inject, Injectable } from '@nestjs/common'
import { ICommandHandler, InMemoryCommandBus } from '@deepblu/ddd'

export const COMMAND_HANDLERS = 'COMMAND_HANDLERS'
@Injectable()
export class CommandBus extends InMemoryCommandBus {
  constructor(
    @Inject(COMMAND_HANDLERS)
    private readonly commandHandlers: ICommandHandler[]
  ) {
    super()
    this.register(this.commandHandlers)
  }
}
