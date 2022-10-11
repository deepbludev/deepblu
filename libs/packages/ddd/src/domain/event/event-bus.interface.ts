import { IEventSubscriber } from './event-subscriber.interface'
import { IDomainEvent } from './event.interface'

export interface IEventBus {
  publish(events: IDomainEvent[]): Promise<void>
  register(subscribers: IEventSubscriber[]): void
}
