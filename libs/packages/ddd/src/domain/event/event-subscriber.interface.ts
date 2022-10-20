import { DomainEventClass, IDomainEvent } from '..'

export abstract class IEventSubscriber<E extends IDomainEvent = IDomainEvent> {
  static readonly subscriptions: DomainEventClass[]

  get subscriptions(): DomainEventClass[] {
    return (this.constructor as typeof IEventSubscriber).subscriptions
  }

  abstract on(event: E): Promise<void>
}
