import { Result, ValueObject } from '../../../domain'
import { InvalidStringError } from './invalid-string.error'

export type StringValidator = (value: string) => boolean
export type StringValidatorMessage = (value: string) => string

export class CustomString extends ValueObject<{ value: string }> {
  private static readonly MIN = 1
  private static readonly MAX = 255

  public static readonly validate: StringValidator = (value: string): boolean =>
    value.length >= CustomString.MIN && value.length <= CustomString.MAX

  public static readonly message: StringValidatorMessage = (
    value: string
  ): string =>
    `Custom string must not be empty and must be less than ${CustomString.MAX} characters. ` +
    `Received ${value.length} characters.`

  /**
   * Creates a new string with the given value, validator and error message
   * @factory
   */
  static create<S extends CustomString>(value: string): Result<S>
  static create<S extends CustomString>(
    value: string,
    validator: StringValidator,
    message: StringValidatorMessage
  ): Result<S>
  static create<S extends CustomString>(
    value: string,
    validator?: StringValidator,
    message?: StringValidatorMessage
  ): Result<S, InvalidStringError> {
    const result = validator ? validator(value) : this.validate(value)
    const resultMsg = message ? message(value) : this.message(value)
    return result
      ? Result.ok(Reflect.construct(this, [{ value }]))
      : Result.fail(InvalidStringError.with(resultMsg))
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
