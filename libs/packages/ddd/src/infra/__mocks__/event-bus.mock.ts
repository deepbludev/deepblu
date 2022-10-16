import { IDomainEvent } from '../../domain/event/domain-event.interface'
import { IEventBus } from '../../domain/event/event-bus.interface'
import { IEventSubscriber } from '../../application'

export class EventBusMock implements IEventBus {
  private _registerMock: jest.Mock = jest.fn()
  private _publishMock: jest.Mock = jest.fn()

  register(subscribers: IEventSubscriber[]): void {
    this._registerMock(subscribers)
  }

  async publish(events: IDomainEvent[]): Promise<void> {
    return this._publishMock(events)
  }
}
