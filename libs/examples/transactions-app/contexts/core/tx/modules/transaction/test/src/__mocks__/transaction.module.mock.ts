import { ICommandBus } from '@deepblu/ddd'
import { CommandBus } from '@deepblu/examples/transactions-app/contexts/core/tx/shared/infra'
import { CreateTransactionController } from '@deepblu/examples/transactions-app/contexts/core/tx/modules/transaction/ui'
import { transactionCommandHandlers } from '@deepblu/examples/transactions-app/contexts/core/tx/modules/transaction/application'

const commandbus = new CommandBus()
commandbus.register(transactionCommandHandlers.map(handler => new handler()))

export const transactionModuleMock = () => ({
  controllers: [CreateTransactionController],
  providers: [{ provide: ICommandBus, useValue: commandbus }],
})
