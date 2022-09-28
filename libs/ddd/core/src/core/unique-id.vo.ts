import { IUniqueID } from '../types/unique-id.interface'
import { idUtils } from '../utils/id.utils'
import { InvalidPropError } from './errors'
import { Result } from './result'
import { ValueObject, VOProps } from './value-object'

export interface UniqueIDProps extends VOProps {
  value: string
}

export class UniqueID extends ValueObject<UniqueIDProps> implements IUniqueID {
  protected constructor(props: UniqueIDProps) {
    super(props)
  }

  equal(id: IUniqueID): boolean {
    return typeof this.value === typeof id.value && this.value === id.value
  }

  override clone<UniqueID>(): UniqueID {
    return super.clone() as UniqueID
  }

  get value(): string {
    return this.props.value
  }

  public static generate(): string {
    return idUtils.defaultID()
  }

  public static validate(id: string): boolean {
    return this.validator.string(id) && id.length > 0
  }

  static isValid(id: string): boolean {
    return this.validate(id)
  }

  public static override isValidProps({ value }: UniqueIDProps): boolean {
    return this.isValid(value)
  }

  static from<I extends UniqueID>(id: string): Result<I> {
    const error = id + ' is not a valid ' + this.name
    return this.isValid(id)
      ? Result.ok(Reflect.construct(this, [{ value: id }]))
      : Result.fail(new InvalidPropError('id', error))
  }

  static create(): UniqueID {
    return new this({ value: this.generate() })
  }
}