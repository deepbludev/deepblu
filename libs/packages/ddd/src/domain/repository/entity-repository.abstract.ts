import { BaseEntity, IEntityProps } from '../entity/base-entity.abstract'

/**
 * Base abstract class for entity repositories. It can be either extended or implemented as an interface.
 * It should be used to persist entities, not aggregate roots, since it will not emit to the event bus.
 * Entities are persisted by the aggregate root repository, so EntityRepository should not be used directly
 * by the application layer, but only by the aggregate root repository.
 *
 * @abstract
 */
export abstract class IEntityRepository<E extends BaseEntity<IEntityProps>> {
  protected abstract persist(entity: E): Promise<void>
  abstract get(id: string): Promise<E | null>

  async exists(id: string): Promise<boolean> {
    return !!(await this.get(id))
  }

  async save(entity: E): Promise<void> {
    await this.persist(entity)
  }
}
