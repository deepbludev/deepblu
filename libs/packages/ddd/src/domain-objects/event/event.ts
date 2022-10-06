/* eslint-disable @typescript-eslint/ban-types */
import {
  BaseAggregate,
  IAggregateProps,
} from '../aggregate/base-aggregate.abstract'
import { IEvent, IEventPayload } from './event.interface'

export class Event<
  A extends BaseAggregate<IAggregateProps>,
  P extends IEventPayload = IEventPayload
> implements IEvent<P>
{
  public readonly timestamp: number

  constructor(
    public readonly aggregate: A,
    public readonly payload: P,
    timestamp?: number
  ) {
    this.timestamp = timestamp || Date.now()
  }

  public get aggregateName(): string {
    return this.aggregate.constructor.name
  }

  public get aggregateId(): string {
    return this.aggregate.id.value
  }
}
