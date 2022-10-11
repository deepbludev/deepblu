import { Constructor, DomainEvent } from '..'

export interface IEventSubscriber<E extends DomainEvent = DomainEvent> {
  on(event: E): Promise<void>
  subscriptions: Constructor<DomainEvent>[]
}
