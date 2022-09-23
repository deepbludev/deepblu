import { BaseEntity, IEntityProps } from './base-entity.abstract'
import { UUID } from './uuid.vo'

export class Entity<P extends IEntityProps> extends BaseEntity<P, UUID> {
  protected constructor(props: P, id?: UUID) {
    super(props, id ?? UUID.create())
  }
}
