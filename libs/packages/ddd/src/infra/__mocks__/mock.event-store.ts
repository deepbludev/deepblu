import { IEventBus, UniqueID } from '../../domain'
import { MockAggregate } from '../../domain/__mocks__/mock.aggregate'
import { IEventStore } from '../persistence/event-store/event-store.abstract'
import { IEventStream } from '../persistence/event-store/event-stream.interface'

export class MockEventStore extends IEventStore<MockAggregate> {
  get(id: UniqueID): Promise<MockAggregate | null> {
    throw new Error('Method not implemented.' + id.value)
  }
  constructor(stream: IEventStream, eventbus: IEventBus) {
    super(stream, eventbus)
  }
}
