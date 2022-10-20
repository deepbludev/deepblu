import { NumberValidator, NumberValidatorError } from './custom-number.vo'

/**
 * Custom number decorator
 * @decorator
 * @example
 * @customNumber({
 *   validator: (value) => value > 0,
 *   error: (value) => InvalidNumberError.with('Custom error message: ' + value)
 * })
 * class MyNumber extends CustomNumber {}
 *
 */
export const customNumber = (opts: {
  validator: NumberValidator
  error: NumberValidatorError
}) =>
  function <
    T extends {
      validate: NumberValidator
      error: NumberValidatorError
    }
  >(CustomNumberClass: T) {
    CustomNumberClass.validate = opts.validator
    CustomNumberClass.error = opts.error
    return CustomNumberClass
  }
