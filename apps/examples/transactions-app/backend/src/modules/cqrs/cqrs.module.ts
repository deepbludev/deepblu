import { Global, Module } from '@nestjs/common'
import { ICommandBus } from '@deepblu/ddd'
import { CommandBus } from '@deepblu/examples/transactions-app/contexts/core/tx/shared/infra'
import { transactionCommandHandlers } from '@deepblu/examples/transactions-app/contexts/core/tx/modules/transaction/application'

const commandbus = new CommandBus()
commandbus.register(transactionCommandHandlers.map(handler => new handler()))

@Global()
@Module({
  providers: [{ provide: ICommandBus, useValue: commandbus }],
  exports: [ICommandBus],
})
export class CqrsModule {}
