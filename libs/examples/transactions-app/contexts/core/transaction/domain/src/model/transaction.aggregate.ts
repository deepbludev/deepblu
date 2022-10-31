import {
  customString,
  CustomString,
  IAggregateRoot,
  NonNegativeNumber,
  PositiveNumber,
  Result,
} from '@deepblu/ddd'
import {
  ClientID,
  Currencies,
  InvalidCurrencyError,
  TxID,
} from '@deepblu/examples/transactions-app/contexts/shared/domain'
import { CreateTransactionDTO } from '../dto/create.transaction.dto'

export class TxAmount extends PositiveNumber {}
export class TxCommission extends NonNegativeNumber {}

@customString({
  validator: value => value in Currencies,
  error: value => InvalidCurrencyError.with(value),
})
export class TxCurrency extends CustomString {}

export class Transaction extends IAggregateRoot<
  {
    clientId: ClientID
    amount: TxAmount
    currency: TxCurrency
    commission: TxCommission
    createdAt: Date
  },
  TxID
> {
  static create(
    dto: CreateTransactionDTO & { commission: number }
  ): Result<Transaction> {
    const { id, clientId, amount, currency, commission } = dto

    const results = [
      TxID.from(id),
      ClientID.from(clientId),
      TxAmount.create(amount),
      TxCurrency.create(currency),
      TxCommission.create(commission),
    ] as const

    const result = Result.combine<Transaction>([...results])
    if (result.isFail) return result

    const [txId, txClientId, txAmount, txCurrency, txCommission] = results
    const tx = new Transaction(
      {
        clientId: txClientId.data,
        amount: txAmount.data,
        currency: txCurrency.data,
        commission: txCommission.data,
        createdAt: new Date(),
      },
      txId.data
    )

    return Result.ok(tx)
  }

  get clientId(): ClientID {
    return this.props.clientId
  }

  get amount(): TxAmount {
    return this.props.amount
  }

  get currency(): TxCurrency {
    return this.props.currency
  }

  get commission(): TxCommission {
    return this.props.commission
  }

  get createdAt(): Date {
    return new Date(this.props.createdAt)
  }
}
