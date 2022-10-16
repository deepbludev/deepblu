import { DomainEventClass, IDomainEvent } from '../../domain'

export interface IEventSubscriber<E extends IDomainEvent = IDomainEvent> {
  subscriptions: DomainEventClass[]
  on(event: E): Promise<void>
}
