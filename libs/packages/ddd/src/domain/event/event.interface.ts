/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMessage } from '../types/message.types'
import { UniqueID } from '../uid/unique-id.vo'

export interface IEvent<P = any> extends IMessage<P> {
  name: string
  aggregateName: string
  aggregateId: UniqueID
  timestamp: number // in milliseconds
}
