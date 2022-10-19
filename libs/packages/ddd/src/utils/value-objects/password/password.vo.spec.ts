import { Result } from '../../../domain'
import { InvalidPasswordError } from './invalid-password.error'
import { Password } from './password.vo'

describe(Password, () => {
  let password: Password
  let tooShort: Result<Password, InvalidPasswordError>
  const encryptedPassword =
    '$2b$12$VRa.q9A2xGui94wyQBX9lujKJVcfCM0cEFpFYBjxKTqXHD0gji0yC'
  let encrypted: Password

  beforeAll(async () => {
    password = (await Password.create('valid_password')).data
    tooShort = await Password.create('invalid')
    encrypted = Password.fromEncrypted(encryptedPassword)
  })

  it('should be defined', () => {
    expect(Password).toBeDefined()
  })

  it('should create a password and encrypt it', () => {
    expect(password.original).toEqual('valid_password')
    expect(password.encrypted).not.toEqual('valid_password')
    expect(password.encrypted).not.toEqual('')
    expect(password.encrypted).toBeTruthy()
  })

  it('should fail when creating with invalid password', async () => {
    expect(tooShort.isOk).toBe(false)
    expect(tooShort.error).toEqual(
      InvalidPasswordError.with(
        'Password "invalid" is too short. It must be at least 10 characters long.'
      )
    )
  })

  it('should validate a password from string', async () => {
    expect(Password.isValid('valid_password')).toBe(true)
    expect(Password.isValid('invalid')).toBe(false)
  })

  it('should create a password from encrypted string', async () => {
    expect(encrypted.original).toBeUndefined()
    expect(encrypted.encrypted).toEqual(encryptedPassword)
  })

  // it('should compare a password with encrypted string', async () => {
  //   expect(await password.compare('valid_password')).toBe(true)
  //   expect(await password.compare('invalid')).toBe(false)
  // })
})
