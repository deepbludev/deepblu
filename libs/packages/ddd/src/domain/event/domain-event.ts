/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { Constructor, IMessage, Payload } from '../types'
import { IEvent } from './event.interface'

export class DomainEvent<P = any> extends IMessage<P> implements IEvent<P> {
  static aggregate = 'Aggregate'
  public readonly timestamp: number

  constructor(
    public override readonly payload: P,
    public readonly aggregateId: string,
    timestamp?: number
  ) {
    super(payload)
    this.timestamp = timestamp || Date.now()
  }

  static with<P = any>(payload: P, id: string) {
    return new this(payload, id)
  }

  get aggregateName(): string {
    return (this.constructor as typeof DomainEvent).aggregate
  }

  get name(): string {
    return this.constructor.name
  }
}

export type DomainEventAs<E extends Constructor<IEvent>> = DomainEvent<
  Payload<E>
>
