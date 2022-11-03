import { Injectable } from '@nestjs/common'
import { IEventBus } from '@deepblu/ddd'
import { TransactionRepo } from '@deepblu/examples/transactions-app/contexts/core/transaction/domain'
import { TransactionEventStream } from './transaction.eventstream'

@Injectable()
export class TransactionEventStore extends TransactionRepo {
  constructor(
    readonly stream: TransactionEventStream,
    readonly eventbus: IEventBus
  ) {
    super(stream, eventbus)
  }
}
