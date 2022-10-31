import { IEventPublisherRepo } from '@deepblu/ddd'
import { TransactionAggregate } from './transaction.aggregate'

export abstract class TransactionRepo extends IEventPublisherRepo<TransactionAggregate> {}
