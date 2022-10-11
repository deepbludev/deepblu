import {
  IAggregateRoot,
  IDomainEvent,
  IEventBus,
  IRepo,
  IUniqueID,
} from '../../../domain'
import { IEventStream } from './event-stream.interface'

export interface AggregateType<A extends IAggregateRoot> {
  name: string
  rehydrate: (id: IUniqueID, events: IDomainEvent[]) => A
}

/**
 * Base abstract class for event stores.
 * It can be either extended or implemented as an interface.
 * It should be used to persist events in a stream
 */
export class EventStore<A extends IAggregateRoot> extends IRepo<A> {
  protected aggregateClass: AggregateType<A> = IAggregateRoot

  constructor(protected readonly stream: IEventStream, eventbus: IEventBus) {
    super(eventbus)
  }

  protected async persist(aggregate: A): Promise<void> {
    await this.stream.append(
      aggregate.id.value,
      aggregate.changes,
      aggregate.version
    )
  }

  async get(id: IUniqueID): Promise<A | null> {
    const events = await this.stream.get(id.value)
    if (!events.length) return null

    return this.aggregateClass.rehydrate(id, events)
  }

  get name(): string {
    return this.aggregateClass.name
  }
}
