import { IEventBus } from '../../domain'
import { MockAggregate } from '../../domain/__mocks__/mock.aggregate'
import { IEventStore } from '../persistence/event-store/event-store.abstract'
import { IEventStream } from '../persistence/event-store/event-stream.interface'
import { eventstore } from '../persistence/event-store/utils/even-store.decorator'

@eventstore(MockAggregate)
export class MockEventStore extends IEventStore<MockAggregate> {
  constructor(stream: IEventStream, eventbus: IEventBus) {
    super(stream, eventbus)
  }
}
