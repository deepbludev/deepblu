import { IEntity, IEntityProps, unique } from '@deepblu/ddd'
import { ObjectID } from '../../value-objects/object-id/object-id.vo'

@unique(ObjectID)
export class EntityOID<P extends IEntityProps> extends IEntity<P, ObjectID> {
  constructor(props: P, id?: ObjectID) {
    super(props, id)
  }
}
