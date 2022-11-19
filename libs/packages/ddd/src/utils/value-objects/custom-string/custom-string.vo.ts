import { Result, ValueObject } from '../../../domain'
import { InvalidStringError } from './invalid-string.error'

export type StringValidator = (value: string) => boolean
export type StringValidatorError = (value: string) => InvalidStringError

export class CustomString extends ValueObject<{ value: string }> {
  protected static readonly MIN: number = 1
  protected static readonly MAX: number = 255

  public static readonly validate: StringValidator = (value: string): boolean =>
    value?.length >= this.MIN && value?.length <= this.MAX

  public static readonly error: StringValidatorError = (value: string) =>
    InvalidStringError.with(
      `Custom string must not be empty and must be less than ${CustomString.MAX} characters. ` +
        `Received ${value?.length ?? 0} characters.`
    )

  /**
   * Creates a new string with the given value, validator and error message
   * @factory
   */
  static create<S extends CustomString, E extends InvalidStringError>(
    value: string
  ): Result<S, E>

  static create<S extends CustomString, E extends InvalidStringError>(
    value: string,
    validator: StringValidator,
    error: StringValidatorError
  ): Result<S, E>

  static create<S extends CustomString, E extends InvalidStringError>(
    value: string,
    validator?: StringValidator,
    error?: StringValidatorError
  ): Result<S, E> {
    const result = validator ? validator(value) : this.isValid(value)
    const resultError = error ? error(value) : this.error(value)
    return result
      ? Result.ok<S, E>(Reflect.construct(this, [{ value }]))
      : Result.fail<S, E>(resultError as E)
  }

  static isValid(value: string): boolean {
    return this.validate(value)
  }

  public static override isValidProps(props: { value: string }): boolean {
    return this.isValid(props.value)
  }

  get value(): string {
    return this.props.value
  }

  get length(): number {
    return this.props.value.length
  }

  get uppercase(): string {
    return this.props.value.toUpperCase()
  }

  get lowercase(): string {
    return this.props.value.toLowerCase()
  }

  get capitalized(): string {
    return (
      this.props.value.charAt(0).toUpperCase() +
      this.props.value.slice(1).toLowerCase()
    )
  }

  private _caseRegex = /(?:^\w|[A-Z]|\b\w)/g

  get camelCase(): string {
    return this.props.value
      .replace(this._caseRegex, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, '')
  }

  private _charCase(char: string): string {
    return this.props.value
      .replace(this._caseRegex, (word, index) =>
        index === 0 ? word.toLowerCase() : char + word.toLowerCase()
      )
      .replace(/\s+/g, '')
  }

  get snakeCase(): string {
    return this._charCase('_')
  }

  get kebabCase(): string {
    return this._charCase('-')
  }

  get dotCase(): string {
    return this._charCase('.')
  }

  get titleCase(): string {
    return this.props.value
      .replace(this._caseRegex, (word, index) =>
        index === 0 ? word.toUpperCase() : ' ' + word.toUpperCase()
      )
      .split(' ')
      .map(s => s.trim())
      .filter(s => s.length)
      .join(' ')
  }

  get sentenceCase(): string {
    return this.props.value
      .replace(this._caseRegex, (word, index) =>
        index === 0 ? word.toUpperCase() : ' ' + word.toLowerCase()
      )
      .split(' ')
      .map(s => s.trim())
      .filter(s => s.length)
      .join(' ')
  }

  get pathCase(): string {
    return CustomString.create(this.lowercase).data._charCase('/')
  }

  get constantCase(): string {
    return this.props.value
      .replace(this._caseRegex, (word, index) =>
        index === 0 ? word.toUpperCase() : '_' + word.toUpperCase()
      )
      .replace(/\s+/g, '')
      .toUpperCase()
  }
}
