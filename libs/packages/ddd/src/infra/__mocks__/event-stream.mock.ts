import { IDomainEvent } from '../../domain'
import { AggregateStub } from '../../domain/__mocks__'
import { IEventStream } from '../persistence/event-sourcing/event-stream.interface'
import { eventstream } from '../persistence/event-sourcing/utils/event-stream.decorator'

@eventstream(AggregateStub.name)
export class EventStreamMock extends IEventStream {
  readonly db: Map<string, { events: IDomainEvent[]; version: number }> =
    new Map()

  async append(aggId: string, events: IDomainEvent[], version: number) {
    const prev = this.db.get(aggId)?.events || []
    this.db.set(aggId, { events: prev.concat(events), version })
  }

  async version(aggId: string): Promise<number> {
    return this.db.get(aggId)?.version ?? -1
  }

  async get(aggId: string): Promise<IDomainEvent[]> {
    return this.db.get(aggId)?.events.filter(e => e.aggregateId === aggId) || []
  }
}
