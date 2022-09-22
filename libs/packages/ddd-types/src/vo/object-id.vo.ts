import { ObjectId as MongoObjectID } from 'mongodb'
import { InvalidPropError, UniqueIDProps } from '@deepblu/ddd'
import { Result } from '@deepblu/ddd'
import { UniqueID } from '@deepblu/ddd'

export class ObjectID extends UniqueID {
  static isValid(value: string): value is string {
    return MongoObjectID.isValid(value)
  }

  public static override isValidProps({ value }: UniqueIDProps): boolean {
    return this.isValid(value)
  }

  static from(id: string): Result<ObjectID> {
    return ObjectID.isValid(id)
      ? Result.ok(new ObjectID({ value: id }))
      : Result.fail(
          new InvalidPropError('ObjectId', id + ' is not a valid ObjectId')
        )
  }

  static create(): ObjectID {
    return new ObjectID({
      value: new MongoObjectID().toHexString(),
      isNew: true,
    })
  }
}
