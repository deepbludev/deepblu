import { Result, ValueObject } from '../../../domain'
import { InvalidNumberError } from './invalid-number.error'

export type NumberValidator = (value: number) => boolean
export type NumberValidatorError = (value: number) => InvalidNumberError

export class CustomNumber extends ValueObject<{ value: number }> {
  public static readonly MIN = Number.MIN_SAFE_INTEGER
  public static readonly MAX = Number.MAX_SAFE_INTEGER

  public static readonly validate: NumberValidator = (value: number): boolean =>
    value >= CustomNumber.MIN && value <= CustomNumber.MAX

  public static readonly error: NumberValidatorError = (value: number) =>
    InvalidNumberError.with(
      `Custom number must be within the range [${CustomNumber.MIN}, ${CustomNumber.MAX}]. ` +
        `Received ${value} instead.`
    )

  /**
   * Creates a new string with the given value, validator and error message
   * @factory
   */
  static create<N extends CustomNumber>(
    value: number
  ): Result<N, InvalidNumberError>

  static create<N extends CustomNumber>(
    value: number,
    validator: NumberValidator,
    message: NumberValidatorError
  ): Result<N, InvalidNumberError>

  static create<N extends CustomNumber>(
    value: number,
    validator?: NumberValidator,
    error?: NumberValidatorError
  ): Result<N, InvalidNumberError> {
    const result = validator ? validator(value) : this.isValid(value)
    const resultError = error ? error(value) : this.error(value)
    return result
      ? Result.ok(Reflect.construct(this, [{ value }]))
      : Result.fail(resultError)
  }

  static isValid(value: number): boolean {
    return this.validate(value)
  }

  public static override isValidProps(props: { value: number }): boolean {
    return this.isValid(props.value)
  }

  get value(): number {
    return this.props.value
  }

  get isPositive(): boolean {
    return this.value > 0
  }

  get isNegative(): boolean {
    return this.value < 0
  }

  get isZero(): boolean {
    return this.value === 0
  }

  get isEven(): boolean {
    return this.value % 2 === 0
  }

  get isOdd(): boolean {
    return !this.isEven
  }

  get isInteger(): boolean {
    return Number.isInteger(this.value)
  }

  isGreaterThan(other: CustomNumber): boolean {
    return this.value > other.value
  }

  isGreaterThanOrEqual(other: CustomNumber): boolean {
    return this.value >= other.value
  }

  isLessThan(other: CustomNumber): boolean {
    return this.value < other.value
  }

  isLessThanOrEqual(other: CustomNumber): boolean {
    return this.value <= other.value
  }

  isEqualTo(other: CustomNumber): boolean {
    return this.value === other.value
  }
}
