import { DomainEventClass, IDomainEvent } from '..'

export interface IEventSubscriber<E extends IDomainEvent = IDomainEvent> {
  subscriptions: DomainEventClass[]
  on(event: E): Promise<void>
}
