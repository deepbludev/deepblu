import { StringValidator, StringValidatorMessage } from './custom-string.vo'

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
  message: StringValidatorMessage
}) =>
  function <
    T extends {
      validate: StringValidator
      message: StringValidatorMessage
    }
  >(CustomStringClass: T) {
    CustomStringClass.validate = opts.validator
    CustomStringClass.message = opts.message
    return CustomStringClass
  }
