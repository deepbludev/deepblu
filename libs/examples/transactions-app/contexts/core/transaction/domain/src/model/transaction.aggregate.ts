import {
  customString,
  CustomString,
  IAggregateRoot,
  PositiveNumber,
  Result,
  UUID,
} from '@deepblu/ddd'
import {
  Currencies,
  InvalidCurrencyError,
} from '@deepblu/examples/transactions-app/contexts/shared/domain'
import { CreateTransactionDTO } from '../dto/create.transaction.dto'

export class TxID extends UUID {}
export class ClientID extends UUID {}
export class TxAmount extends PositiveNumber {}

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
  },
  TxID
> {
  static create(dto: CreateTransactionDTO): Result<Transaction> {
    const { id, clientId, amount, currency } = dto

    const results = [
      TxID.from(id),
      ClientID.from(clientId),
      TxAmount.create(amount),
      TxCurrency.create(currency),
    ] as const

    const result = Result.combine<Transaction>([...results])
    if (result.isFail) return result

    const [txId, txClientId, txAmount, txCurrency] = results
    const tx = new Transaction(
      {
        clientId: txClientId.data,
        amount: txAmount.data,
        currency: txCurrency.data,
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
}
