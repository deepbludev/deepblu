/* eslint-disable @typescript-eslint/ban-types */
import { IEvent, IEventPayload } from './event.interface'

export abstract class DomainEvent<P extends IEventPayload = IEventPayload>
  implements IEvent<P>
{
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

  get eventName(): string {
    return `${this.aggregateName}.${this.constructor.name}`
  }
}
