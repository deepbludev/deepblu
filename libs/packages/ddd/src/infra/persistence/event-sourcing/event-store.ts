import {
  IAggregateRoot,
  IDomainEvent,
  IEventBus,
  IEventPublisherRepo,
  IUniqueID,
} from '../../../domain'
import { ConcurrencyError } from './errors/event-sourcing.errors'
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
export abstract class EventStore<
  A extends IAggregateRoot
> extends IEventPublisherRepo<A> {
  protected aggregateClass: AggregateType<A> = IAggregateRoot

  constructor(protected readonly stream: IEventStream, eventbus: IEventBus) {
    super(eventbus)
  }

  protected async persist(
    aggregate: A,
    expectedVersion?: number
  ): Promise<void> {
    const current = await this.version(aggregate.id)
    const version = expectedVersion ?? aggregate.version
    if (current !== version) throw new ConcurrencyError(aggregate, current)
    const { id, changes } = aggregate
    await this.stream.append(id.value, changes, version + changes.length)
  }

  async get(id: IUniqueID): Promise<A | null> {
    const events = await this.stream.get(id.value)
    if (!events.length) return null
    return this.aggregateClass.rehydrate(id, events)
  }

  get name(): string {
    return this.aggregateClass.name
  }

  get aggregateName(): string {
    return this.aggregateClass.name
  }

  get streamName(): string {
    return this.stream.name
  }

  async version(aggrId: IUniqueID): Promise<number> {
    return await this.stream.version(aggrId.value)
  }
}
