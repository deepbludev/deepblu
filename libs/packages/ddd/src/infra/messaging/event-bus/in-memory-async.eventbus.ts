import { EventEmitter } from 'events'
import { IDomainEvent, IEventBus, IEventSubscriber } from '../../../domain'

export class InMemoryAsyncEventBus extends EventEmitter implements IEventBus {
  register(subscribers: IEventSubscriber[]): void {
    subscribers.forEach(s =>
      s.subscriptions.forEach(e => this.on(e.name, s.on.bind(s)))
    )
  }

  async publish(events: IDomainEvent[]): Promise<void> {
    events.map(e => this.emit(e.name, e))
  }
}
