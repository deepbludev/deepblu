import { Email } from './email.vo'
import { InvalidEmailError } from './invalid-email.error'

describe(Email, () => {
  const valid = ['foo@bar.com', 'foo@gmail.com', 'bar@deepblu.dev']
  const invalid = ['foo', 'foo@bar', 'foo@bar.', 'foo@bar.com-', '']

  it('should be defined', () => {
    expect(Email.create).toBeDefined()
  })

  it('should create a valid email', () => {
    valid.forEach(e => {
      const email = Email.create(e)
      expect(email.isOk).toBe(true)
      expect(email.data.value).toEqual(e)
    })
  })

  it('should fail if provided an invalid email', () => {
    invalid.forEach(e => {
      const email = Email.create(e)
      expect(email.isFail).toBe(true)
      expect(email.error).toEqual(InvalidEmailError.with(e))
    })
  })
})
