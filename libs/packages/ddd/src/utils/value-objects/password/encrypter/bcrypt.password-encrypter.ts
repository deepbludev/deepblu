import bcrypt from 'bcrypt'
import { PasswordEncrypter } from './password-encrypter.interface'

export class BCryptPasswordEncrypter implements PasswordEncrypter {
  constructor(public readonly salt: number = 12) {}

  public encrypt(password: string, salt?: number): string {
    return bcrypt.hashSync(password, salt || this.salt)
  }

  public compare(password: string, encrypted: string): boolean {
    return bcrypt.compareSync(password, encrypted)
  }
}
