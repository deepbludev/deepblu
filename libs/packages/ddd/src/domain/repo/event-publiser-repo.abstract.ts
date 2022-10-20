import { IAggregateRoot } from '../aggregate-root/aggregate-root.abstract'
import { IEventBus } from '../event/event-bus.interface'
import { IEntityRepo } from './entity-repo.abstract'

/**
 * Base abstract class for aggregate repositories.
 * It can be either extended or implemented as an interface.
 * It should be used to persist aggregate roots, using entity repositories to persist entities, if needed.
 * @abstract
 */
export abstract class IEventPublisherRepo<
  A extends IAggregateRoot
> extends IEntityRepo<A> {
  constructor(protected readonly eventbus: IEventBus) {
    super()
  }

  override async save(aggregate: A, expectedVersion?: number): Promise<void> {
    await super.save(aggregate, expectedVersion)
    await this.eventbus.publish(aggregate.commit())
  }
}
