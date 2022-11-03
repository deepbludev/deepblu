import { EventStore } from '@deepblu/ddd'
import { Transaction } from './transaction.aggregate'

export abstract class TransactionRepo extends EventStore<Transaction> {}
