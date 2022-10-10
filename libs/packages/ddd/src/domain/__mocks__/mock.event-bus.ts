import { IEvent } from '../event/event.interface'
import { IEventBus } from '../event/eventbus.interface'

export class MockEventBus implements IEventBus {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async publish(events: IEvent[]) {
    return Promise.resolve()
  }
}