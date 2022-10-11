import { IDomainEvent, IEventBus, IEventSubscriber } from '../../../domain'

export class InMemoryAsyncEventBus implements IEventBus {
  private _subscribers: Set<IEventSubscriber> = new Set()

  register(subscribers: IEventSubscriber[]): void {
    subscribers.forEach(s => this._subscribers.add(s))
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async publish(events: IDomainEvent[]): Promise<void> {
    return Promise.resolve()
  }
}
