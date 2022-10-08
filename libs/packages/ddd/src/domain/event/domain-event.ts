/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { Constructor, Payload } from '../types'
import { IEvent } from './event.interface'

export abstract class DomainEvent<P = any> implements IEvent<P> {
  static aggregate = 'Aggregate'
  public readonly timestamp: number

  constructor(
    public readonly aggregateId: string,
    public readonly payload: P,
    timestamp?: number
  ) {
    this.timestamp = timestamp || Date.now()
  }

  get aggregateName(): string {
    return (this.constructor as typeof DomainEvent).aggregate
  }

  get name(): string {
    return this.constructor.name
  }
}

export type DomainEventFrom<E extends Constructor<IEvent>> = DomainEvent<
  Payload<E>
>
