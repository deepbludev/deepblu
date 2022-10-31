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
import { CreateTransactionDTO } from './transaction.dto'

export class TxID extends UUID {}
export class ClientID extends UUID {}
export class TxAmount extends PositiveNumber {}

@customString({
  validator: value => value in Currencies,
  error: value => InvalidCurrencyError.with(value),
})
export class TxCurrency extends CustomString {}

export class TransactionAggregate extends IAggregateRoot<
  { clientId: ClientID; amount: TxAmount; currency: TxCurrency },
  TxID
> {
  static create(props: CreateTransactionDTO): Result<TransactionAggregate> {
    const { id, clientId, amount, currency } = props

    const txId = TxID.from(id)
    if (txId.isFail) return Result.fail(txId.error)

    const txClientId = ClientID.from(clientId)
    if (txClientId.isFail) return Result.fail(txClientId.error)

    const txAmount = TxAmount.create(amount)
    if (txAmount.isFail) return Result.fail(txAmount.error)

    const txCurrency = TxCurrency.create(currency)
    if (txCurrency.isFail) return Result.fail(txCurrency.error)

    const tx = new TransactionAggregate(
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
