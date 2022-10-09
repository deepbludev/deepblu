/* eslint-disable @typescript-eslint/no-explicit-any */

import { IEvent } from '../../domain/event/event.interface'

export interface IEventSubscriber<T extends IEvent = IEvent> {
  handle(event: T): void
}
