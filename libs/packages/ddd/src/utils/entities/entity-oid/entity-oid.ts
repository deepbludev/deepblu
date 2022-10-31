import { IEntity, IEntityProps, unique } from '../../../domain'
import { ObjectID } from '../../value-objects/object-id/object-id.vo'

@unique(ObjectID)
export class EntityOID<P extends IEntityProps> extends IEntity<ObjectID, P> {
  constructor(props: P, id?: ObjectID) {
    super(props, id)
  }
}
