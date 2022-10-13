import {
  AggregateCreatedStub,
  AggregateToggledStub,
  PropsUpdatedStub,
} from '../../domain/__mocks__/events.stub'
import { IEventSubscriber } from '../../domain/event/event-subscriber.interface'
import { IDomainEvent } from '../../domain'

export class EventSubscriberMock
  implements IEventSubscriber<AggregateCreatedStub | PropsUpdatedStub>
{
  private _on: jest.Mock = jest.fn()
  on(event: IDomainEvent): Promise<void> {
    return this._on(event)
  }

  get subscriptions() {
    return [AggregateCreatedStub, PropsUpdatedStub]
  }
}

export class OtherEventSubscriberMock
  implements IEventSubscriber<PropsUpdatedStub | AggregateToggledStub>
{
  private _on: jest.Mock = jest.fn()
  on(event: AggregateToggledStub): Promise<void> {
    return this._on(event)
  }

  get subscriptions() {
    return [AggregateToggledStub, PropsUpdatedStub]
  }
}
