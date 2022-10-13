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

export interface DomainEventFactory<P extends IPayload = IPayload> {
  aggregate: string
  canonical: string
  with: (payload: P, id: IUniqueID) => any
  from: (event: any) => any
}

export type DomainEventClass<P extends IPayload = IPayload> = Constructor &
  DomainEventFactory<P>
