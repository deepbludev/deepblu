import { customNumber } from '../custom-number/custom-number.decorator'
import { CustomNumber } from '../custom-number/custom-number.vo'
import { InvalidNumberError } from '../custom-number/invalid-number.error'

@customNumber({
  validator: (value: number) => value >= 0,
  error: (value: number) =>
    InvalidNumberError.with(
      `Transaction amount must be greater than 0. Received: ${value}`
    ),
})
export class NonNegativeNumber extends CustomNumber {}
