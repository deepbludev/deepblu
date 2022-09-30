import { ObjectId as MongoObjectID } from 'mongodb'
import { customUID, UniqueIDProps, UniqueID } from '@deepblu/ddd/core'

@customUID({
  generator: () => new MongoObjectID().toHexString(),
  validator: (id: string) =>
    MongoObjectID.isValid(id) && String(new MongoObjectID(id)) === id,
})
export class ObjectID extends UniqueID {
  constructor(props: UniqueIDProps) {
    super(props)
  }
}
