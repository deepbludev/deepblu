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

/**
 * Decorator to create a unique ID class with a static create method
 * with the given generator and validator functions.
 * @example
 * <pre>
 * @id({
 *  generator: () => new ObjectID().toHexString(),
 *  validator: (id: string) => ObjectID.isValid(id)
 * })
 * class ObjectID extends UniqueID {
 *   constructor(props: UniqueIDProps) {
 *     super(props)
 *   }
 * }
 *</pre>
 *
 * @param opts Options for the ID class. Object containing the generator and validator functions.
 * @returns class decorator
 */
export const id = (opts: {
  generator: () => string
  validator: (id: string) => boolean
}) =>
  function <
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    T extends typeof UniqueID & {
      generate: () => string
      validate: (id: string) => boolean
    }
  >(UniqueIDClass: T) {
    UniqueIDClass.generate = opts.generator
    UniqueIDClass.validate = opts.validator
    return UniqueIDClass
  }
