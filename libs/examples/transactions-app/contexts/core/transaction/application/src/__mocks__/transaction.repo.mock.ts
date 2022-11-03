import { IEntityRepo } from '@deepblu/ddd'
import { Transaction } from '@deepblu/examples/transactions-app/contexts/core/transaction/domain'

export class TransactionRepoMock extends IEntityRepo<Transaction> {
  exists = jest.fn().mockResolvedValue(false)
  get = jest.fn()
  save = jest.fn()
  persist = jest.fn()
}
