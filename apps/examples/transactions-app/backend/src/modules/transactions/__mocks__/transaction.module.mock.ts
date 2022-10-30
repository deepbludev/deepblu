import { CqrsModule } from '../../cqrs/cqrs.module'
import { TransactionController } from '../controllers/transaction.controller'

export const transactionModuleMock = () => ({
  imports: [CqrsModule],
  controllers: [TransactionController],
})
