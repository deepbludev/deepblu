import { Currency } from '@deepblu/examples/transactions-app/contexts/core/tx/shared/domain'

export class CreateTransactionRequestDTO {
  date: string
  amount: number
  currency: Currency
  clientId: string
}
