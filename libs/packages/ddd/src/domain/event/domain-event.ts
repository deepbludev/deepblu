/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { IMessage, IPayload } from '../types'
import { UniqueID } from '../uid/unique-id.vo'
import { EventID } from './event-id.vo'
import { IDomainEvent, IEvent } from './event.interface'

export abstract class DomainEvent<P extends IPayload = IPayload>
  extends IMessage<P>
  implements IEvent<P>
{
  static aggregate = 'Aggregate'

  constructor(
    public override readonly payload: P,
    public readonly aggregateId: UniqueID,
    public readonly id: EventID = EventID.create(),
    public readonly timestamp: number = Date.now()
  ) {
    super(payload)
  }

  /**
   * Creates a new DomainEvent from payload and aggregateId
   * @factory
   */
  static with<P extends IPayload = IPayload>(
    payload: P,
    id: UniqueID
  ): DomainEvent<P> {
    return Reflect.construct(this, [payload, id])
  }

  /**
   * Creates a new DomainEvent from a serialized event
   * @factory
   * @param serialized - the serialized event usually coming from a message queue or persistance layer
   */
  static from<P extends IPayload>(serialized: IDomainEvent<P>): DomainEvent<P> {
    const deserialized = Reflect.construct(this, [
      serialized.payload,
      UniqueID.from(serialized.aggregateId).data,
    ])
    Reflect.set(deserialized, 'timestamp', serialized.timestamp)
    Reflect.set(deserialized, 'id', EventID.from(serialized.id).data)
    return deserialized
  }

  /**
   * Serializes the event to a plain object.
   * Useful for persistance or sending over the wire.
   * @returns serialized version of the event.
   */
  serialize(): IDomainEvent<P> {
    return {
      id: this.id.value,
      name: this.name,
      timestamp: this.timestamp,
      aggregateId: this.aggregateId.value,
      aggregateName: this.aggregateName,
      payload: this.payload,
    }
  }

  get aggregateName(): string {
    return (this.constructor as typeof DomainEvent).aggregate
  }

  get name(): string {
    return this.constructor.name
  }
}
