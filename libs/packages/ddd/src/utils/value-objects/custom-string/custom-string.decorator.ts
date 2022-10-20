import { StringValidator, StringValidatorError } from './custom-string.vo'

/**
 * Custom string decorator
 * @decorator
 * @example
 * @customString({
 *   validator: (value: string) => value.startsWith('valid'),
 *   error: (value: string) => () => InvalidStringError.with('Custom error message: ' + value)
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
