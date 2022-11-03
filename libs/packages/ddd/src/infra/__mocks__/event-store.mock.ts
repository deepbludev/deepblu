import { IEventBus } from '../../domain'
import { AggregateStub } from '../../domain/__mocks__/aggregate.stub'
import { EventStore } from '../persistence/event-sourcing/event-store'
import { eventstore } from '../persistence/event-sourcing/utils/event-store.decorator'
import { EventStreamMock } from './event-stream.mock'

/**
 * if you don't wat to specify the type of eventstream, you can omit the constructor,
 * which will default to IEventStream.
 *
 * @example
 * @eventstore(AggregateStub)
 * export class EventStoreMock extends EventStore<AggregateStub> {}
 */
@eventstore(AggregateStub)
export class EventStoreMock extends EventStore<AggregateStub> {
  constructor(stream: EventStreamMock, eventbus: IEventBus) {
    super(stream, eventbus)
  }
}
