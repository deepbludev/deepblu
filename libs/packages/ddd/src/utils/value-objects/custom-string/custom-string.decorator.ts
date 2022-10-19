import { StringValidator, StringValidatorError } from './custom-string.vo'

/**
 * Custom string decorator
 * @decorator
 * @example
 * @customString({
 *   validator: (value) => value.startsWith('valid'),
 *   message: (value) => 'Custom error message: ' + value
 * })
 * class MyString extends CustomString {}
 *
 */
export const customString = (opts: {
  validator: StringValidator
  error: StringValidatorError
}) =>
  function <
    T extends {
      validate: StringValidator
      error: StringValidatorError
    }
  >(CustomStringClass: T) {
    CustomStringClass.validate = opts.validator
    CustomStringClass.error = opts.error
    return CustomStringClass
  }
