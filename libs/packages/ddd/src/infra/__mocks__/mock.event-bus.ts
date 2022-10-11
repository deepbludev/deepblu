import { IEvent } from '../../domain/event/event.interface'
import { IEventBus } from '../../domain/event/eventbus.interface'

export class MockEventBus implements IEventBus {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async publish(events: IEvent[]) {
    return Promise.resolve()
  }
}
