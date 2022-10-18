import { blacklist, whitelist } from './custom-email.decorator'
import { Email } from './email.vo'
import { InvalidEmailError } from './invalid-email.error'

describe(Email, () => {
  const valid = [
    'foo@bar.com',
    'foo@gmail.com',
    'bar@deepblu.dev',
    'foo@foo.bar.growthlatam.solutions',
  ]
  const invalid = ['foo', 'foo@bar', 'foo@bar.', 'foo@bar.com-', '']

  const email = Email.create(valid[0]).data
  const otherEmail = Email.create(valid[3]).data

  it('should be defined', () => {
    expect(Email.create).toBeDefined()
  })

  it('should create a valid email', () => {
    valid.forEach(e => {
      const validEmail = Email.create(e)
      expect(validEmail.isOk).toBe(true)
      expect(validEmail.data.value).toEqual(e)
    })
  })

  it('should fail if provided an invalid email', () => {
    invalid.forEach(e => {
      const invalidEmail = Email.create(e)
      expect(invalidEmail.isFail).toBe(true)
      expect(invalidEmail.error).toEqual(InvalidEmailError.with(e))
    })
  })

  it('should get the email value', () => {
    expect(email.value).toEqual(valid[0])
  })

  it('should get the email domain', () => {
    expect(email.domain).toEqual('bar.com')
    expect(otherEmail.domain).toEqual('foo.bar.growthlatam.solutions')
  })

  it('should get the email username', () => {
    expect(email.username).toEqual('foo')
  })

  it('should get the email tld', () => {
    expect(email.tld).toEqual('com')
    expect(otherEmail.tld).toEqual('solutions')
  })

  describe('when providing whitelisted/blacklisted domains', () => {
    @whitelist(
      'gmail.com',
      'hotmail.com',
      'yahoo.com',
      'aol.com',
      'outlook.com'
    )
    class WhitelistedEmail extends Email {}

    @blacklist('mailinator.com', 'guerrillamail.com')
    class BlacklistedEmail extends Email {}

    it('should only accept domains from valid domain list, if provided', () => {
      const validEmail = WhitelistedEmail.create('foo@gmail.com')
      const otherValidEmail = WhitelistedEmail.create('foo@hotmail.com')
      const invalidEmail = WhitelistedEmail.create('foo@baz.com')
      const otherInvalidEmail = WhitelistedEmail.create('foo @gmail.com')

      expect(validEmail.isOk).toBe(true)
      expect(otherValidEmail.isOk).toBe(true)
      expect(invalidEmail.isOk).toBe(false)
      expect(otherInvalidEmail.isOk).toBe(false)
    })

    it('should reject blacklisted domains, if provided', () => {
      const validEmail = BlacklistedEmail.create('foo@bar.com')
      const invalidEmail = BlacklistedEmail.create('bar@guerrillamail.com')

      expect(validEmail.isOk).toBe(true)
      expect(invalidEmail.isOk).toBe(false)
    })
  })
})
