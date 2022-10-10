import { IEventBus } from '../../domain'
import { MockAggregate } from '../../domain/__mocks__/mock.aggregate'
import { EventStore } from '../persistence/event-store/event-store'
import { IEventStream } from '../persistence/event-store/event-stream.interface'
import { eventstore } from '../persistence/event-store/utils/even-store.decorator'

@eventstore(MockAggregate)
export class MockEventStore extends EventStore<MockAggregate> {
  constructor(stream: IEventStream, eventbus: IEventBus) {
    super(stream, eventbus)
  }
}
