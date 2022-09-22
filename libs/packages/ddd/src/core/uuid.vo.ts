import uuid from '../utils/uuid.utils'
import { InvalidPropError } from './errors'
import { Result } from './result'
import { UniqueID, UniqueIDProps } from './unique-id.abstract'

export class UUID extends UniqueID {
  static isValid(value: string): value is string {
    return uuid.isValid(value)
  }

  public static override isValidProps({ value }: UniqueIDProps): boolean {
    return this.isValid(value)
  }

  static from(id: string): Result<UUID> {
    return UUID.isValid(id)
      ? Result.ok(new UUID({ value: id }))
      : Result.fail(new InvalidPropError('uuid', id + ' is not a valid UUID'))
  }

  static create(): UUID {
    return new UUID({ value: uuid.create() })
  }
}
