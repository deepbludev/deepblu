import { ICommandBus } from '@deepblu/ddd'
import { CommandBus } from '@deepblu/examples/transactions-app/contexts/core/tx/shared/infra'
import { CreateTransactionController } from '@deepblu/examples/transactions-app/contexts/core/tx/modules/transaction/ui'

export const transactionModuleMock = () => ({
  controllers: [CreateTransactionController],
  providers: [{ provide: ICommandBus, useClass: CommandBus }],
})
