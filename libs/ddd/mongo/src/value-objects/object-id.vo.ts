import { ObjectId as MongoObjectID } from 'mongodb'
import { id, UniqueIDProps } from '@deepblu/ddd'
import { UniqueID } from '@deepblu/ddd'

@id({
  generator: () => new MongoObjectID().toHexString(),
  validator: MongoObjectID.isValid,
})
export class ObjectID extends UniqueID {
  constructor(props: UniqueIDProps) {
    super(props)
  }
}
