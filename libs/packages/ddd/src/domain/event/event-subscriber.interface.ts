import { Constructor, IDomainEvent } from '..'

export interface IEventSubscriber<E extends IDomainEvent = IDomainEvent> {
  subscriptions: Constructor<IDomainEvent>[]
  on(event: E): Promise<void>
}
