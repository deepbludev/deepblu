import { IEventPublisherRepo } from '@deepblu/ddd'
import { Transaction } from './transaction.aggregate'

export abstract class TransactionRepo extends IEventPublisherRepo<Transaction> {}
