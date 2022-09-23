import { BaseEntity, id, IEntityProps } from './base-entity.abstract'
import { UUID } from './uuid.vo'

/**
 * @class Entity
 * Entity class using UUID as ID.
 */
@id(UUID.create)
export class Entity<P extends IEntityProps> extends BaseEntity<P, UUID> {
  constructor(props: P, id?: UUID) {
    super(props, id)
  }
}
