import { IEvent } from '../../domain'
import { MockAggregate } from '../../domain/__mocks__/mock.aggregate'
import { IEventStream } from '../persistence/event-store/event-stream.interface'

export class MockEventStream extends IEventStream {
  name = MockAggregate.name
  readonly db: Map<string, { events: IEvent[]; version: number }> = new Map()

  async append(aggId: string, events: IEvent[], version: number) {
    const prev = this.db.get(aggId)?.events || []
    this.db.set(aggId, { events: prev.concat(events), version })
  }

  async get(aggId: string): Promise<IEvent[]> {
    return (
      this.db.get(aggId)?.events.filter(e => e.aggregateId.value === aggId) ||
      []
    )
  }
}
