/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMessage, IPayload } from '../types/message.types'
import { UniqueID } from '../uid/unique-id.vo'

export interface IEvent<P extends IPayload = IPayload> extends IMessage<P> {
  name: string
  aggregateName: string
  aggregateId: UniqueID
  timestamp: number // in milliseconds
}

export interface IDomainEvent<P extends IPayload = IPayload>
  extends Omit<IEvent<P>, 'aggregateId'> {
  id: string
  aggregateId: string
}
