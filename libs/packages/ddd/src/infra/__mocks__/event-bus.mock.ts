import { IDomainEvent, IEventBus, IEventSubscriber } from '../../domain'

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
