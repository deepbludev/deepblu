import { IEntityRepo } from '@deepblu/ddd'
import { TransactionAggregate } from '@deepblu/examples/transactions-app/contexts/core/transaction/domain'

export class TransactionRepoMock extends IEntityRepo<TransactionAggregate> {
  exists = jest.fn().mockResolvedValue(false)
  get = jest.fn()
  save = jest.fn()
  persist = jest.fn()
}
