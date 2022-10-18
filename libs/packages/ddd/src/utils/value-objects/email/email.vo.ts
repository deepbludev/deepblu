import { Result } from '../../../domain'
import { textUtils } from '../../text.utils'
import { customString } from '../custom-string/custom-string.decorator'
import { CustomString } from '../custom-string/custom-string.vo'
import { InvalidEmailError } from './invalid-email.error'

@customString({
  validator: (email: string) => textUtils.isValidEmail(email),
  message: (email: string) => email,
})
export class Email extends CustomString {
  /**
   * Creates a new email with the given value, validator and error message
   * @factory
   */
  static override create<E extends CustomString>(
    value: string
  ): Result<E, InvalidEmailError> {
    const result = super.create(value)
    return result.isOk
      ? (result as Result<E, InvalidEmailError>)
      : Result.fail(InvalidEmailError.with(value))
  }
}
