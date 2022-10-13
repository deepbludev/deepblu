import { AggregateStub } from '../../domain/__mocks__/aggregate.stub'
import { EventStore } from '../persistence/event-store/event-store'
import { eventstore } from '../persistence/event-store/utils/even-store.decorator'

@eventstore(AggregateStub)
export class EventStoreMock extends EventStore<AggregateStub> {}
