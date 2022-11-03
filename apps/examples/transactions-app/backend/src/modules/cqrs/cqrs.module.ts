import { Global, Module } from '@nestjs/common'
import { ICommandBus, ICommandHandler, IEventBus } from '@deepblu/ddd'
import { transactionCommandHandlers } from '@deepblu/examples/transactions-app/contexts/core/transaction/application'
import { CommandBus, COMMAND_HANDLERS } from './commandbus'
import { TransactionModule } from '../transactions/transaction.module'
import { EventBus } from './eventbus'

const commandHandlers = [...transactionCommandHandlers]

@Global()
@Module({
  imports: [TransactionModule],
  providers: [
    ...commandHandlers,
    {
      provide: COMMAND_HANDLERS,
      useFactory: (...handlers: ICommandHandler[]) => handlers,
      inject: commandHandlers,
    },
    { provide: ICommandBus, useClass: CommandBus },
    { provide: IEventBus, useClass: EventBus },
  ],
  exports: [ICommandBus, IEventBus],
})
export class CqrsModule {}
