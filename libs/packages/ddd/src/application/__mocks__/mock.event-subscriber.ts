import { DomainEventAs } from '../../domain'
import {
  MockAggregateCreated,
  MockAggregateToggled,
  MockAggregateToggledType,
} from '../../domain/__mocks__/mock.events'
import { IEventSubscriber } from '../event/event-subscriber.interface'

type MockEventSubscriberEvent =
  | DomainEventAs<typeof MockAggregateCreated>
  | MockAggregateToggledType

export class MockEventSubscriber
  implements IEventSubscriber<MockEventSubscriberEvent>
{
  on(event: MockEventSubscriberEvent) {
    console.log(event.payload)
    return Promise.resolve()
  }

  subscriptions = [MockAggregateCreated, MockAggregateToggled]
}
