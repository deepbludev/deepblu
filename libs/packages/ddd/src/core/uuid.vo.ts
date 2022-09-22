import uuid from '../utils/uuid.utils'
import { InvalidPropError } from './errors'
import { Result } from './result'
import { UniqueID } from './unique-id.abstract'

export class UUID extends UniqueID {
  static isValid(value: string): value is string {
    return uuid.isValid(value)
  }

  static from(id: string): Result<UUID> {
    return UUID.isValid(id)
      ? Result.ok(new UUID({ value: id, isNew: false }))
      : Result.fail(new InvalidPropError('uuid', id + ' is not a valid UUID'))
  }

  static create(): UUID {
    return new UUID({ value: uuid.create(), isNew: true })
  }
}
