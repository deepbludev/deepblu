import { Result, ValueObject } from '../../../domain'
import { textUtils } from '../../text.utils'
import {
  StringValidator,
  StringValidatorError,
} from '../custom-string/custom-string.vo'
import { BCryptPasswordEncrypter } from './encrypter/bcrypt.password-encrypter'
import { PasswordEncrypter } from './encrypter/password-encrypter.interface'
import { InvalidPasswordError } from './invalid-password.error'

export class Password extends ValueObject<{
  original?: string
  encrypted: string
}> {
  private static readonly MIN = 10
  static readonly encrypter: PasswordEncrypter = new BCryptPasswordEncrypter()

  public static readonly validate: StringValidator = (value: string): boolean =>
    value.length >= this.MIN

  public static async generate(length: number): Promise<Password> {
    return (await this.create(textUtils.randomString(length))).data
  }

  public static readonly error: StringValidatorError = (password: string) =>
    InvalidPasswordError.with(
      `Password "${password}" is too short. It must be at least ${this.MIN} characters long.`
    )

  static async create(
    original: string
  ): Promise<Result<Password, InvalidPasswordError>>

  static async create(
    original: string,
    validator: StringValidator,
    error: StringValidatorError
  ): Promise<Result<Password, InvalidPasswordError>>

  static async create(
    original: string,
    validator?: StringValidator,
    error?: StringValidatorError
  ): Promise<Result<Password, InvalidPasswordError>> {
    const result = validator ? validator(original) : this.isValid(original)
    const resultError = error ? error(original) : this.error(original)

    if (!result) return Result.fail(resultError)

    const encrypted = await Password.encrypt(original)
    return Result.ok(Reflect.construct(this, [{ original, encrypted }]))
    // return Result.ok(new Password({ original, encrypted }))
  }

  static fromEncrypted(encrypted: string): Password {
    return new Password({ encrypted })
  }

  static random(length?: number) {
    const l = length || this.MIN
    return this.generate(l > this.MIN ? l : this.MIN)
  }

  static isValid(password?: string) {
    return this.validate(password || '')
  }

  static async encrypt(password: string): Promise<string> {
    return this.encrypter.encrypt(password)
  }

  static isPassword(password: unknown): password is Password {
    return password instanceof Password
  }

  async compare(password: string): Promise<boolean>
  async compare(password: Password): Promise<boolean>
  async compare(password: string | Password): Promise<boolean> {
    return Password.isPassword(password)
      ? this.original
        ? Password.encrypter.compare(this.original, password.encrypted)
        : this.encrypted === password.encrypted
      : this.encrypter.compare(password, this.encrypted)
  }

  get original(): string | undefined {
    return this.props.original
  }

  get encrypted(): string {
    return this.props.encrypted
  }

  get encrypter() {
    return (this.constructor as typeof Password).encrypter
  }
}
