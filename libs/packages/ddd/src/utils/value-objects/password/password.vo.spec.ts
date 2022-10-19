import { Result } from '../../../domain'
import { customPassword } from './custom-password.decorator'
import { InvalidPasswordError } from './invalid-password.error'
import { Password } from './password.vo'

describe(Password, () => {
  const original = 'valid_password'
  let password: Password
  let encrypted: Password

  const otherOriginal = 'other_password'
  let otherPassword: Password
  let otherEncrypted: Password

  let tooShort: Result<Password, InvalidPasswordError>

  beforeAll(() => {
    password = Password.create(original).data
    encrypted = Password.fromEncrypted(password.value)
    otherPassword = Password.create(otherOriginal).data
    otherEncrypted = Password.fromEncrypted(otherPassword.value)
    tooShort = Password.create('invalid')
  })

  it('should be defined', () => {
    expect(Password).toBeDefined()
  })

  it('should create a password and encrypt it', () => {
    expect(password.value).not.toEqual(original)
    expect(password.value).not.toEqual('')
    expect(password.value).toBeTruthy()
  })

  it('should fail when creating with invalid password', () => {
    expect(tooShort.isOk).toBe(false)
    expect(tooShort.error).toEqual(
      InvalidPasswordError.with(
        'Password "invalid" is too short. It must be at least 10 characters long.'
      )
    )
  })

  it('should validate a password from string', () => {
    expect(Password.isValid(original)).toBe(true)
    expect(Password.isValid('invalid')).toBe(false)
  })

  it('should create a password from encrypted string', () => {
    expect(encrypted.value).toEqual(password.value)
  })

  it('should compare passwords', () => {
    expect(password.compare(original)).toBe(true)
    expect(password.compare('invalid')).toBe(false)
    expect(encrypted.compare(original)).toBe(true)
    expect(encrypted.compare('invalid')).toBe(false)
    expect(otherPassword.compare(otherOriginal)).toBe(true)
    expect(otherEncrypted.compare(otherOriginal)).toBe(true)

    expect(password.compare(encrypted)).toBe(true)
    expect(encrypted.compare(password)).toBe(true)
    expect(password.compare(password)).toBe(true)
    expect(encrypted.compare(encrypted)).toBe(true)

    expect(otherPassword.compare(otherEncrypted)).toBe(true)
    expect(otherEncrypted.compare(otherPassword)).toBe(true)

    expect(password.compare(otherPassword)).toBe(false)
    expect(otherPassword.compare(password)).toBe(false)
    expect(encrypted.compare(otherPassword)).toBe(false)
    expect(otherPassword.compare(encrypted)).toBe(false)
    expect(encrypted.compare(otherEncrypted)).toBe(false)
    expect(otherEncrypted.compare(encrypted)).toBe(false)
  })

  it('should generate valid random passwords', () => {
    const random = Password.random()
    expect(Password.isValid(random)).toBe(true)
    expect(random.length).toBe(10)

    const other = Password.random(25)
    expect(Password.isValid(other))
    expect(other.length).toBe(25)
  })

  describe('Custom validators', () => {
    const validator = (original: string) => original.startsWith('valid')
    const errorFn = (original: string) =>
      InvalidPasswordError.with('Custom error message: ' + original)

    it('should create a valid password if validator does not fail', () => {
      const { isOk } = Password.create('valid_password', validator, errorFn)
      expect(isOk).toBe(true)
    })

    it('should fail if validator fails', () => {
      const { error } = Password.create('invalid_password', validator, errorFn)
      expect(error).toEqual(
        InvalidPasswordError.with('Custom error message: invalid_password')
      )
    })

    describe('@customPassword decorator', () => {
      it('should set custom validator', () => {
        @customPassword({ validator, error: errorFn })
        class TestPassword extends Password {}

        const validPassword = TestPassword.create('valid_password')
        const invalidPassword = TestPassword.create('invalid_password')

        expect(validPassword.isOk).toBeTruthy()
        expect(invalidPassword.isFail).toBeTruthy()
        expect(invalidPassword.error).toEqual(
          InvalidPasswordError.with('Custom error message: invalid_password')
        )
      })
    })
  })
})
