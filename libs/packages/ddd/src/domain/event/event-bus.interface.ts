import { IEventSubscriber } from './event-subscriber.interface'
import { IEvent } from './event.interface'

export interface IEventBus {
  publish(events: IEvent[]): Promise<void>
  register(subscribers: IEventSubscriber[]): void
}
