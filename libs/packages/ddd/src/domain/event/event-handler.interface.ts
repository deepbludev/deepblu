/* eslint-disable @typescript-eslint/no-explicit-any */

import { IEvent } from './event.interface'

export interface IEventHandler<T extends IEvent = IEvent, R = any> {
  handle(event: T): R
}
