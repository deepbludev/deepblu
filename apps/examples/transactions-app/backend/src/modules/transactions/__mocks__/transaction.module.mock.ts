import { transactionCommandHandlers } from '@deepblu/examples/transactions-app/contexts/core/tx/modules/transaction/application'
import { CommandBus } from '../../cqrs/commandbus'
import { CqrsModule } from '../../cqrs/cqrs.module'
import { TransactionController } from '../controllers/transaction.controller'

const commandbus = new CommandBus()
commandbus.register(transactionCommandHandlers.map(handler => new handler()))

export const transactionModuleMock = () => ({
  imports: [CqrsModule],
  controllers: [TransactionController],
})
