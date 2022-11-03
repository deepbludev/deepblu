import { EventStore } from '@deepblu/ddd'
import { Injectable } from '@nestjs/common'
import { Transaction } from './transaction.aggregate'

@Injectable()
export abstract class TransactionRepo extends EventStore<Transaction> {}
