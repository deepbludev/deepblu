import { AggregateStub } from '../../domain/__mocks__/aggregate.stub'
import { EventStore } from '../persistence/event-sourcing/event-store'
import { eventstore } from '../persistence/event-sourcing/utils/even-store.decorator'

@eventstore(AggregateStub)
export class EventStoreMock extends EventStore<AggregateStub> {}
