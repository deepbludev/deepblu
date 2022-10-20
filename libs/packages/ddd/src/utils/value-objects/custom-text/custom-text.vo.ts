import { customString } from '../custom-string/custom-string.decorator'
import { CustomString } from '../custom-string/custom-string.vo'
import { InvalidStringError } from '../custom-string/invalid-string.error'

@customString({
  validator: value => value.length > 0,
  error: () => InvalidStringError.with('Custom text must not be empty'),
})
export class CustomText extends CustomString {}
