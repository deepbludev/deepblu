import { BaseEntity, id, IEntityProps } from '@deepblu/ddd'
import { ObjectID } from '../value-objects/object-id.vo'

@id(ObjectID.create)
export class EntityWithObjectID<
  P extends IEntityProps = IEntityProps
> extends BaseEntity<P, ObjectID> {
  constructor(props: P, id?: ObjectID) {
    super(props, id)
  }
}
