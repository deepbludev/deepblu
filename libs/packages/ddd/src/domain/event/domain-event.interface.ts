/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMessage, IPayload, Constructor } from '../types'
import { IUniqueID } from '../uid/unique-id.vo'

export interface IDomainEvent<P extends IPayload = IPayload>
  extends IMessage<P> {
  id: string
  name: string
  canonical: string
  aggregateName: string
  aggregateId: string
  timestamp: number // in milliseconds
}

export type DomainEventClass = Constructor & {
  aggregate: string
  with: (payload: any, id: IUniqueID) => any
  from: (event: any) => any
  canonical: string
}
