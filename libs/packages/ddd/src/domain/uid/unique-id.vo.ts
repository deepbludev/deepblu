import { IUniqueID } from './unique-id.interface'
import { idUtils } from '../../utils/id.utils'
import { ValueObject, VOProps } from '../value-object/value-object'
import { Result } from '../core/result'
import { InvalidPropError } from '../core/errors'

export interface UniqueIDProps extends VOProps {
  value: string
}

export class UniqueID extends ValueObject<UniqueIDProps> implements IUniqueID {
  protected constructor(props: UniqueIDProps) {
    super(props)
  }

  override clone<UniqueID>(): UniqueID {
    return super.clone() as UniqueID
  }

  override equals(id: ValueObject<UniqueIDProps>): boolean {
    return Reflect.has(id, 'value') && this.value === (id as UniqueID).value
  }

  get value(): string {
    return this.props.value
  }

  public static generate(): string {
    return idUtils.uid()
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
