/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMessage } from '../types/message.types'

export interface IEvent<P = any> extends IMessage<P> {
  name: string
  aggregateName: string
  aggregateId: string
  timestamp: number // in milliseconds
}
