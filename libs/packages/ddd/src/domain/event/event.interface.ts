/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMessage } from '../../types/message.interface'

export interface IEvent<P = any> extends IMessage<P> {
  aggregateName: string
  aggregateId: string
  timestamp: number // in milliseconds
}
