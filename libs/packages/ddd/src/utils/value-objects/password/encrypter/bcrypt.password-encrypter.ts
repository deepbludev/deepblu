import bcrypt from 'bcrypt'
import { PasswordEncrypter } from './password-encrypter.interface'

export class BCryptPasswordEncrypter implements PasswordEncrypter {
  constructor(public readonly salt: number = 12) {}

  public async encrypt(password: string, salt?: number): Promise<string> {
    return bcrypt.hash(password, salt || this.salt)
  }

  public async compare(password: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(password, encrypted)
  }
}
