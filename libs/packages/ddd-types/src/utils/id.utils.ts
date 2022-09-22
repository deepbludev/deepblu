import * as uuidv4 from 'uuid'
import { ObjectId } from 'mongodb'

export const uuid = {
  create: (): string => uuidv4.v4(),
  validate: (value: unknown): value is string => {
    return typeof value === 'string' && uuidv4.validate(value)
  },
}

export const objectId = {
  create: (): string => new ObjectId().toHexString(),
  instance: ObjectId,
}

export const id = {
  uuid,
  objectId,
}

export default id
