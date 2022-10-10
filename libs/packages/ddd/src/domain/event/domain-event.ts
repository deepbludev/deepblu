/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { Constructor, IMessage, Payload } from '../types'
import { UniqueID } from '../uid/unique-id.vo'
import { EventID } from './event-id.vo'
import { IEvent } from './event.interface'

export abstract class DomainEvent<P = any, I extends EventID = EventID>
  extends IMessage<P>
  implements IEvent<P>
{
  static aggregate = 'Aggregate'

  constructor(
    public override readonly payload: P,
    public readonly aggregateId: UniqueID,
    public readonly id: I = EventID.create<I>(),
    public readonly timestamp: number = Date.now()
  ) {
    super(payload)
  }

  static with<P = any>(payload: P, id: UniqueID): DomainEvent<P> {
    return Reflect.construct(this, [payload, id])
  }

  get aggregateName(): string {
    return (this.constructor as typeof DomainEvent).aggregate
  }

  get name(): string {
    return this.constructor.name
  }
}

/**
 * @description
 * Utility type to cast an event constructor created with createDomainEvent() to a DomainEvent
 */
export type DomainEventAs<E extends Constructor<IEvent>> = DomainEvent<
  Payload<E>
>
