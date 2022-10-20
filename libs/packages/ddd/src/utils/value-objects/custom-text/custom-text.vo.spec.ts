import { InvalidStringError } from '../custom-string/invalid-string.error'
import { CustomText } from './custom-text.vo'

describe(CustomText, () => {
  it('should allow unlimited length', () => {
    const subject = CustomText.create('a'.repeat(1000))
    expect(subject.isOk).toBe(true)
  })

  it('should have a custom error message', () => {
    const subject = CustomText.create('')
    expect(subject.isFail).toBe(true)
    expect(subject.error).toEqual(
      new InvalidStringError('Custom text must not be empty')
    )
  })
})
