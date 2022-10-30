import { Global, Module } from '@nestjs/common'
import { ICommandBus, ICommandHandler } from '@deepblu/ddd'
import { transactionCommandHandlers } from '@deepblu/examples/transactions-app/contexts/core/transaction/application'
import { CommandBus, COMMAND_HANDLERS } from './commandbus'

const commandHandlers = [...transactionCommandHandlers]

export const commandHandlerProviders = [
  ...commandHandlers,
  {
    provide: COMMAND_HANDLERS,
    useFactory: (...handlers: ICommandHandler[]) => handlers,
    inject: commandHandlers,
  },
]

@Global()
@Module({
  providers: [
    ...commandHandlerProviders,
    { provide: ICommandBus, useClass: CommandBus },
  ],
  exports: [ICommandBus],
})
export class CqrsModule {}
