import { Global, Module } from '@nestjs/common'
import { ICommandBus } from '@deepblu/ddd'
import { CommandBus } from './commandbus'
import { transactionCommandHandlers } from '@deepblu/examples/transactions-app/contexts/core/transaction/application'

const commandbus = new CommandBus()
commandbus.register(transactionCommandHandlers.map(handler => new handler()))

@Global()
@Module({
  providers: [{ provide: ICommandBus, useValue: commandbus }],
  exports: [ICommandBus],
})
export class CqrsModule {}
