import { IEntity } from '../entity/entity.abstract'
import { IUniqueID } from '../uid/unique-id.vo'

/**
 * Base abstract class for entity repositories. It can be either extended or implemented as an interface.
 * It should be used to persist entities, not aggregate roots, since it will not emit to the event bus.
 * Entities are persisted by the aggregate root repository, so EntityRepository should not be used directly
 * by the application layer, but only by the aggregate root repository.
 *
 * @abstract
 */
export abstract class IEntityRepo<E extends IEntity> {
  abstract get(id: IUniqueID): Promise<E | null>
  protected abstract persist(entity: E, expectedVersion?: number): Promise<void>

  async exists(id: IUniqueID): Promise<boolean> {
    return !!(await this.get(id))
  }

  async save(entity: E, version?: number): Promise<void> {
    await this.persist(entity, version)
  }
}
