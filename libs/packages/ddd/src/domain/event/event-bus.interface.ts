import { IEventSubscriber } from '../../application/event/event-subscriber.interface'
import { IDomainEvent } from './domain-event.interface'

export interface IEventBus {
  publish(events: IDomainEvent[]): Promise<void>
  register(subscribers: IEventSubscriber[]): void
}
