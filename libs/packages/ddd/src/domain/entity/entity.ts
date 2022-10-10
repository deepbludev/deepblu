import { UUID } from '../uid/uuid.vo'
import { unique } from './utils/unique.decorator'
import { IEntity, IEntityProps } from './base-entity.abstract'

/**
 * @class Entity
 * Entity class using UUID as ID.
 */
@unique(UUID)
export class Entity<P extends IEntityProps> extends IEntity<P, UUID> {
  constructor(props: P, id?: UUID) {
    super(props, id)
  }
}
