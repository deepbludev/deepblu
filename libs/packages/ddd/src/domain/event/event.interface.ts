/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMessage, IPayload } from '../types/message.types'

export interface IDomainEvent<P extends IPayload = IPayload>
  extends IMessage<P> {
  id: string
  name: string
  aggregateName: string
  aggregateId: string
  timestamp: number // in milliseconds
}

// export interface IDomainEvent<P extends IPayload = IPayload>
//   extends Omit<IEvent<P>, 'aggregateId'> {
//   id: string
//   aggregateId: string
// }
