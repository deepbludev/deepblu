import { Result } from '../../../domain'
import { InvalidPasswordError } from './invalid-password.error'
import { Password } from './password.vo'

describe(Password, () => {
  let password: Password
  let encrypted: Password
  let other: Password
  let otherEncrypted: Password
  let tooShort: Result<Password, InvalidPasswordError>

  beforeAll(async () => {
    password = (await Password.create('valid_password')).data
    encrypted = Password.fromEncrypted(password.encrypted)
    other = (await Password.create('other_password')).data
    otherEncrypted = Password.fromEncrypted(other.encrypted)
    tooShort = await Password.create('invalid')
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
    expect(encrypted.encrypted).toEqual(password.encrypted)
  })

  it('should compare passwords', async () => {
    expect(await password.compare('valid_password')).toBe(true)
    expect(await password.compare('invalid')).toBe(false)
    expect(await encrypted.compare('valid_password')).toBe(true)
    expect(await encrypted.compare('invalid')).toBe(false)
    expect(await other.compare('other_password')).toBe(true)
    expect(await otherEncrypted.compare('other_password')).toBe(true)

    expect(await password.compare(encrypted)).toBe(true)
    expect(await encrypted.compare(password)).toBe(true)
    expect(await password.compare(password)).toBe(true)
    expect(await encrypted.compare(encrypted)).toBe(true)

    expect(await other.compare(otherEncrypted)).toBe(true)
    expect(await otherEncrypted.compare(other)).toBe(true)

    expect(await password.compare(other)).toBe(false)
    expect(await other.compare(password)).toBe(false)
    expect(await encrypted.compare(other)).toBe(false)
    expect(await other.compare(encrypted)).toBe(false)
    expect(await encrypted.compare(otherEncrypted)).toBe(false)
    expect(await otherEncrypted.compare(encrypted)).toBe(false)
  })

  it('should generate valid random passwords', async () => {
    const random = await Password.random()
    expect(Password.isValid(random.original))
    expect(random.original?.length).toBe(10)
    expect(random.original).not.toEqual(random.encrypted)
    expect(random.encrypted).not.toEqual('')

    const other = await Password.random(25)
    expect(Password.isValid(other.original))
    expect(other.original?.length).toBe(25)
    expect(other.encrypted).not.toEqual('')
  })

  // describe('Custom validators', () => {
  //   it('should validate a password with custom validator', async () => {
  //     const custom = await Password.create('valid_password', {
  //       validator: (value) => value.length >= 20,
  //       error: InvalidPasswordError.with('Password must be at least 20 characters long.'),
  //     })
  //     expect(custom.isOk).toBe(false)
  //     expect(custom.error).toEqual(
  //       InvalidPasswordError.with('Password must be at least 20 characters long.')
  //     )
  //   })

  //   it('should validate a password with custom validator and custom error', async () => {
  //     const custom = await Password.create('valid_password', {
  //       validator: (value) => value.length >= 20,
  //       error: InvalidPasswordError.with('Password must be at least 20 characters long.'),
  //     })
  //     expect(custom.isOk).toBe(false)
  //     expect(custom.error).toEqual(
  //       InvalidPasswordError.with('Password must be at least 20 characters long.')
  //     )
  //   })
  // })
})
