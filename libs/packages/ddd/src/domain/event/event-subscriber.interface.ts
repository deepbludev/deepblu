import { Constructor, IDomainEvent } from '..'

export interface IEventSubscriber<E extends IDomainEvent = IDomainEvent> {
  on(event: E): Promise<void>
  subscriptions: Constructor<IDomainEvent>[]
}
