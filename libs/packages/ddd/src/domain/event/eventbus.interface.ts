import { IEvent } from './event.interface'

export interface IEventBus {
  publish(events: IEvent[]): Promise<void>
  // register(handlers)
}
