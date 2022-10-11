import {
  MockAggregateCreated,
  MockAggregateToggled,
  MockPropsUpdated,
} from '../../domain/__mocks__/mock.events'
import { IEventSubscriber } from '../../domain/event/event-subscriber.interface'

type MockEventSubscriberEvent =
  | MockAggregateCreated
  | MockAggregateToggled
  | MockPropsUpdated

export class MockEventSubscriber
  implements IEventSubscriber<MockEventSubscriberEvent>
{
  on(event: MockEventSubscriberEvent) {
    console.log(event.payload)
    return Promise.resolve()
  }

  get subscriptions() {
    return [MockAggregateCreated, MockAggregateToggled, MockPropsUpdated]
  }
}
