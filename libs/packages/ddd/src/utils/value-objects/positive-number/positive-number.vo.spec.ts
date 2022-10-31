import { PositiveNumber } from './positive-number.vo'

describe(PositiveNumber, () => {
  it('should allow positive numbers', () => {
    const subject = PositiveNumber.create(1)
    const subject2 = PositiveNumber.create(0.1)
    const subject3 = PositiveNumber.create(0.01)
    const subject4 = PositiveNumber.create(10)

    expect(subject.isOk).toBe(true)
    expect(subject2.isOk).toBe(true)
    expect(subject3.isOk).toBe(true)
    expect(subject4.isOk).toBe(true)
  })

  it('should reject non-positive numbers', () => {
    const subject = PositiveNumber.create(0)
    const subject2 = PositiveNumber.create(-1)
    const subject3 = PositiveNumber.create(-0.1)
    const subject4 = PositiveNumber.create(-0.01)

    expect(subject.isFail).toBe(true)
    expect(subject2.isFail).toBe(true)
    expect(subject3.isFail).toBe(true)
    expect(subject4.isFail).toBe(true)
  })
})
