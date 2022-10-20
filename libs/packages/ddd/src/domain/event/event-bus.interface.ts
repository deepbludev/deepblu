import { IDomainEvent } from './domain-event.interface'
import { IEventSubscriber } from './event-subscriber.interface'

export interface IEventBus {
  publish(events: IDomainEvent[]): Promise<void>
  register(subscribers: IEventSubscriber[]): void
}
