import { BaseEntity, IEntityProps, unique } from '@deepblu/ddd/core'
import { ObjectID } from '../value-objects/object-id.vo'

@unique(ObjectID)
export class EntityOID<P extends IEntityProps> extends BaseEntity<P, ObjectID> {
  constructor(props: P, id?: ObjectID) {
    super(props, id)
  }
}
