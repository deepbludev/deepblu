import { BaseEntity, IEntityProps } from '../entity/base-entity.abstract'

/**
 * Base abstract class for all repositories.
 * It can be either extended or implemented as an interface.
 * @abstract
 */
export abstract class IRepository<E extends BaseEntity<IEntityProps>> {
  abstract save(entity: E): Promise<void>
  abstract get(id: string): Promise<E | null>

  async exists(id: string): Promise<boolean> {
    return !!(await this.get(id))
  }
}
