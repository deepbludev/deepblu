/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMessage } from './message.interface'

export interface IEventPayload {
  [key: string]: any
}

export interface IEvent<P extends IEventPayload = Record<string, never>>
  extends IMessage {
  aggregateName: string
  aggregateId: string
  payload: P
  timestamp: number // in milliseconds
}
