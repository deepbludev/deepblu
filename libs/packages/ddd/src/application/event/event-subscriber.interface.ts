import { Constructor, DomainEvent } from '../../domain'

export interface IEventSubscriber<E extends DomainEvent> {
  on(event: E): Promise<void>
  subscriptions: Constructor<DomainEvent>[]
}
