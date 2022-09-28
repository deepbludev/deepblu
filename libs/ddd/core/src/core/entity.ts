import { unique } from '../decorators/unique.decorator'
import { BaseEntity, IEntityProps } from './base-entity.abstract'
import { UUID } from './uuid.vo'

/**
 * @class Entity
 * Entity class using UUID as ID.
 */
@unique(UUID)
export class Entity<P extends IEntityProps> extends BaseEntity<P, UUID> {
  constructor(props: P, id?: UUID) {
    super(props, id)
  }
}
