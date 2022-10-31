import { NonNegativeNumber } from './non-negative-number.vo'

describe(NonNegativeNumber, () => {
  it('should allow positive numbers', () => {
    const subject = NonNegativeNumber.create(0)
    const subject1 = NonNegativeNumber.create(1)
    const subject2 = NonNegativeNumber.create(0.1)
    const subject3 = NonNegativeNumber.create(0.01)
    const subject4 = NonNegativeNumber.create(10)

    expect(subject.isOk).toBe(true)
    expect(subject1.isOk).toBe(true)
    expect(subject2.isOk).toBe(true)
    expect(subject3.isOk).toBe(true)
    expect(subject4.isOk).toBe(true)
  })

  it('should reject non-positive numbers', () => {
    const subject = NonNegativeNumber.create(-1)
    const subject1 = NonNegativeNumber.create(-2)
    const subject2 = NonNegativeNumber.create(-10)
    const subject3 = NonNegativeNumber.create(-0.1)
    const subject4 = NonNegativeNumber.create(-0.01)

    expect(subject.isFail).toBe(true)
    expect(subject1.isFail).toBe(true)
    expect(subject2.isFail).toBe(true)
    expect(subject3.isFail).toBe(true)
    expect(subject4.isFail).toBe(true)
  })
})
