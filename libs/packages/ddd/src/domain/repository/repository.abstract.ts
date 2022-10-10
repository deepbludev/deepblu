import {
  BaseAggregateRoot,
  IAggregateProps,
} from '../aggregate/base-aggregate-root.abstract'
import { IEventBus } from '../event/eventbus.interface'
import { IEntityRepository } from './entity-repository.abstract'

/**
 * Base abstract class for aggregate repositories.
 * It can be either extended or implemented as an interface.
 * It should be used to persist aggregate roots, using entity repositories to persist entities, if needed.
 * @abstract
 */
export abstract class IRepository<
  A extends BaseAggregateRoot<IAggregateProps>
> extends IEntityRepository<A> {
  constructor(private readonly eventbus: IEventBus) {
    super()
  }

  override async save(aggregate: A): Promise<void> {
    await this.persist(aggregate)
    await this.eventbus.publish(aggregate.commit())
  }
}
