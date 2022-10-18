import { customString } from '../custom-string/custom-string.decorator'
import { CustomString } from '../custom-string/custom-string.vo'

@customString({
  validator: value => value.length > 0,
  message: () => 'Custom text must not be empty.',
})
export class CustomText extends CustomString {}
