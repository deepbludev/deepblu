import {
  AggregateCreatedStub,
  AggregateToggledStub,
  PropsUpdatedStub,
} from '../../domain/__mocks__'
import { eventSubscriber, IDomainEvent, IEventSubscriber } from '../../domain'

@eventSubscriber(AggregateCreatedStub, PropsUpdatedStub)
export class EventSubscriberMock extends IEventSubscriber<
  AggregateCreatedStub | PropsUpdatedStub
> {
  private _on: jest.Mock = jest.fn()
  on(event: IDomainEvent): Promise<void> {
    return this._on(event)
  }
}

export class OtherEventSubscriberMock extends IEventSubscriber<
  PropsUpdatedStub | AggregateToggledStub
> {
  override get subscriptions() {
    return [AggregateToggledStub, PropsUpdatedStub]
  }

  private _on: jest.Mock = jest.fn()
  on(event: AggregateToggledStub): Promise<void> {
    return this._on(event)
  }
}

export class EmptyEventSubscriberMock extends IEventSubscriber<
  PropsUpdatedStub | AggregateToggledStub
> {
  private _on: jest.Mock = jest.fn()
  on(event: AggregateToggledStub): Promise<void> {
    return this._on(event)
  }
}
