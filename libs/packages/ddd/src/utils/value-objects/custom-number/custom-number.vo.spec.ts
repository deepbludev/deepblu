import { customNumber } from './custom-number.decorator'
import { CustomNumber } from './custom-number.vo'
import { InvalidNumberError } from './invalid-number.error'

describe(CustomNumber, () => {
  const subject = CustomNumber.create(123).data
  const otherSubject = CustomNumber.create(-246).data
  const zero = CustomNumber.create(0).data
  const decimal = CustomNumber.create(123.456).data

  it('should be defined', () => {
    expect(CustomNumber.create).toBeDefined()
  })

  it('should create a valid number', () => {
    expect(CustomNumber.create(1).isOk).toBe(true)
    expect(CustomNumber.create(0).isOk).toBe(true)
    expect(CustomNumber.create(-1).isOk).toBe(true)
  })

  it('should fail if provided an invalid number', () => {
    expect(CustomNumber.create(Number.MIN_SAFE_INTEGER - 2).isFail).toBe(true)
    expect(CustomNumber.create(Number.MAX_SAFE_INTEGER + 2).isFail).toBe(true)
  })

  it('should get original value', () => {
    expect(subject.value).toBe(123)
  })

  it('should be able to check if number is positive', () => {
    expect(subject.isPositive).toBe(true)
    expect(zero.isPositive).toBe(false)
    expect(otherSubject.isPositive).toBe(false)
  })

  it('should be able to check if number is negative', () => {
    expect(subject.isNegative).toBe(false)
    expect(zero.isNegative).toBe(false)
    expect(otherSubject.isNegative).toBe(true)
  })

  it('should be able to check if number is zero', () => {
    expect(subject.isZero).toBe(false)
    expect(zero.isZero).toBe(true)
  })

  it('should be able to check if number is even', () => {
    expect(subject.isEven).toBe(false)
    expect(zero.isEven).toBe(true)
    expect(otherSubject.isEven).toBe(true)
  })

  it('should be able to check if number is odd', () => {
    expect(subject.isOdd).toBe(true)
    expect(zero.isOdd).toBe(false)
    expect(otherSubject.isOdd).toBe(false)
  })

  it('should be able to check if number is integer', () => {
    expect(subject.isInteger).toBe(true)
    expect(zero.isInteger).toBe(true)
    expect(otherSubject.isInteger).toBe(true)
    expect(decimal.isInteger).toBe(false)
  })

  it('should be ablet to check if number is greater than another', () => {
    expect(subject.isGreaterThan(otherSubject)).toBe(true)
    expect(subject.isGreaterThan(subject)).toBe(false)
    expect(subject.isGreaterThan(zero)).toBe(true)
    expect(subject.isGreaterThan(decimal)).toBe(false)
  })

  it('should be ablet to check if number is greater than or equal to another', () => {
    expect(subject.isGreaterThanOrEqual(otherSubject)).toBe(true)
    expect(subject.isGreaterThanOrEqual(subject)).toBe(true)
    expect(subject.isGreaterThanOrEqual(zero)).toBe(true)
    expect(subject.isGreaterThanOrEqual(decimal)).toBe(false)
  })

  it('should be ablet to check if number is less than another', () => {
    expect(subject.isLessThan(otherSubject)).toBe(false)
    expect(subject.isLessThan(subject)).toBe(false)
    expect(subject.isLessThan(zero)).toBe(false)
    expect(subject.isLessThan(decimal)).toBe(true)
  })

  it('should be ablet to check if number is less than or equal to another', () => {
    expect(subject.isLessThanOrEqual(otherSubject)).toBe(false)
    expect(subject.isLessThanOrEqual(subject)).toBe(true)
    expect(subject.isLessThanOrEqual(zero)).toBe(false)
    expect(subject.isLessThanOrEqual(decimal)).toBe(true)
  })

  it('should check equality', () => {
    expect(subject.isEqualTo(subject)).toBe(true)
    expect(subject.isEqualTo(otherSubject)).toBe(false)
  })

  describe('Custom validator', () => {
    const validator = (value: number) => value > 0
    const error = (value: number) =>
      InvalidNumberError.with('Custom error message: ' + value)

    it('should create a valid number if validator does not fail', () => {
      expect(CustomNumber.create(1, validator, error).isOk).toBe(true)
    })

    it('should fail if validator fails', () => {
      expect(CustomNumber.create(-1, validator, error).error).toEqual(
        InvalidNumberError.with('Custom error message: -1')
      )
    })

    describe('@customNumber decorator', () => {
      it('should set custom validator', () => {
        @customNumber({ validator, error })
        class TestNumber extends CustomNumber {}

        const validNumber = TestNumber.create(1)
        const invalidNumber = TestNumber.create(-1)

        expect(validNumber.isOk).toBeTruthy()
        expect(invalidNumber.isFail).toBeTruthy()
        expect(invalidNumber.error).toEqual(
          InvalidNumberError.with('Custom error message: -1')
        )
      })
    })
  })
})
