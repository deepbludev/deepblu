import { NumberValidator, NumberValidatorMessage } from './custom-number.vo'

/**
 * Custom number decorator
 * @decorator
 * @example
 * @customNumber({
 *   validator: (value) => value > 0,
 *   message: (value) => 'Custom error message: ' + value
 * })
 * class MyNumber extends CustomNumber {}
 *
 */
export const customNumber = (opts: {
  validator: NumberValidator
  message: NumberValidatorMessage
}) =>
  function <
    T extends {
      validate: NumberValidator
      message: NumberValidatorMessage
    }
  >(CustomNumberClass: T) {
    CustomNumberClass.validate = opts.validator
    CustomNumberClass.message = opts.message
    return CustomNumberClass
  }
