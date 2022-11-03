import { IEventBus, IEventStream } from '@deepblu/ddd'
import { TransactionRepo } from '@deepblu/examples/transactions-app/contexts/core/transaction/domain'

export class TransactionEventstore extends TransactionRepo {
  constructor(stream: IEventStream, eventbus: IEventBus) {
    super(stream, eventbus)
  }
}
