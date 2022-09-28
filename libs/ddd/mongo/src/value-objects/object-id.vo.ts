import { ObjectId as MongoObjectID } from 'mongodb'
import { uid, UniqueIDProps } from '@deepblu/ddd'
import { UniqueID } from '@deepblu/ddd'

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
