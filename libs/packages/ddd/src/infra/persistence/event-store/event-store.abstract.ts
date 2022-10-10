import { IAggregateRoot, IEventBus, IRepo } from '../../../domain'
import { IEventStream } from './event-stream.interface'

export abstract class IEventStore<A extends IAggregateRoot> extends IRepo<A> {
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
}
