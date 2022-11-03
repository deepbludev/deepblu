import { Injectable } from '@nestjs/common'
import { eventstream, IDomainEvent } from '@deepblu/ddd'
import { Transaction } from '@deepblu/examples/transactions-app/contexts/core/transaction/domain'
import { TransactionEventStream } from '../transaction.eventstream'

@Injectable()
@eventstream(Transaction.name)
export class InMemoryTransactionEventStream extends TransactionEventStream {
  readonly db: Map<string, { events: IDomainEvent[]; version: number }> =
    new Map()

  async append(txId: string, events: IDomainEvent[], version: number) {
    const prev = this.db.get(txId)?.events || []
    this.db.set(txId, { events: prev.concat(events), version })
  }

  async version(txId: string): Promise<number> {
    return this.db.get(txId)?.version ?? -1
  }

  async get(txId: string): Promise<IDomainEvent[]> {
    return this.db.get(txId)?.events.filter(e => e.aggregateId === txId) || []
  }
}
