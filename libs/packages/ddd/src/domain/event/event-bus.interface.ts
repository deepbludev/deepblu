import { IDomainEvent } from './domain-event.interface'
import { IEventSubscriber } from './event-subscriber.interface'

export abstract class IEventBus {
  abstract publish(events: IDomainEvent[]): Promise<void>
  abstract register(subscribers: IEventSubscriber[]): void
}
