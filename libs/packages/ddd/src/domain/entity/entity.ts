import { UUID } from '../uid/uuid.vo'
import { unique } from './utils/unique.decorator'
import { BaseEntity, IEntityProps } from './base-entity.abstract'

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
