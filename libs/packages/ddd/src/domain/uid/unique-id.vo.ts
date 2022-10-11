import { idUtils } from '../../utils/id.utils'
import { ValueObject, IValueObjectProps } from '../value-object/value-object'
import { Result } from '../core/result'
import { InvalidPropError } from '../core/errors'

export interface UniqueIDProps extends IValueObjectProps {
  value: string
}

export abstract class IUniqueID extends ValueObject<UniqueIDProps> {
  override equals(id: ValueObject<UniqueIDProps>): boolean {
    return Reflect.has(id, 'value') && this.value === (id as IUniqueID).value
  }

  get value(): string {
    return this.props.value
  }

  public static generate(): string {
    return idUtils.uid.create()
  }

  public static validate(id: string): boolean {
    return idUtils.uid.isValid(id)
  }

  static isValid(id: string): boolean {
    return this.validate(id)
  }

  public static override isValidProps({ value }: UniqueIDProps): boolean {
    return this.isValid(value)
  }

  static from<I extends IUniqueID>(id: string): Result<I> {
    const error = id + ' is not a valid ' + this.name
    return this.isValid(id)
      ? Result.ok(Reflect.construct(this, [{ value: id }]))
      : Result.fail(new InvalidPropError('id', error))
  }

  static create<I extends IUniqueID = IUniqueID>(): I {
    return Reflect.construct(this, [{ value: this.generate() }]) as I
  }
}
