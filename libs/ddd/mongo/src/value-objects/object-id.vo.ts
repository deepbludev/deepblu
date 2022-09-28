import { ObjectId as MongoObjectID } from 'mongodb'
import { uid, UniqueIDProps, UniqueID } from '@deepblu/ddd/core'

@uid({
  generator: () => new MongoObjectID().toHexString(),
  validator: (id: string) =>
    MongoObjectID.isValid(id) && String(new MongoObjectID(id)) === id,
})
export class ObjectID extends UniqueID {
  constructor(props: UniqueIDProps) {
    super(props)
  }
}
