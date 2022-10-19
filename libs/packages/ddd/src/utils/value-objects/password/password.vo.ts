import { Result, ValueObject } from '../../../domain'
import {
  StringValidator,
  StringValidatorMessage,
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

  public static readonly message: StringValidatorMessage = (
    password: string
  ): string =>
    `Password "${password}" is too short. It must be at least ${this.MIN} characters long.`

  public static async create(original: string): Promise<Result<Password>> {
    if (!this.isValid(original))
      return Result.fail(InvalidPasswordError.with(this.message(original)))

    const encrypted = await Password.encrypt(original)
    return Result.ok(new Password({ original, encrypted }))
  }

  public static fromEncrypted(encrypted: string): Password {
    return new Password({ encrypted })
  }

  static isValid(password: string) {
    return this.validate(password)
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
