import {
  customString,
  CustomString,
  IAggregateRoot,
  NonNegativeNumber,
  PositiveNumber,
  Props,
  Result,
} from '@deepblu/ddd'
import {
  ClientID,
  Currencies,
  InvalidCurrencyError,
  TxID,
} from '@deepblu/examples/transactions-app/contexts/shared/domain'
import { TransactionDTO } from './transaction.dto'
import { TransactionCreated } from './transaction.events'

/**
 * TxAmount Value Object
 */
export class TxAmount extends PositiveNumber {}

/**
 * TxCommission Value Object
 */
export class TxCommission extends NonNegativeNumber {}

@customString({
  validator: value => value in Currencies,
  error: value => InvalidCurrencyError.with(value),
})
/**
 * TxCurrency Value Object
 */
export class TxCurrency extends CustomString {}

/**
 * Utility function to create a transaction's props from a transaction DTO.
 * @param dto
 * @returns
 */
function createProps(dto: Omit<TransactionDTO, 'createdAt'>) {
  const { id, clientId, amount, currency, commission } = dto

  const results = [
    TxID.from(id),
    ClientID.from(clientId),
    TxAmount.create(amount),
    TxCurrency.create(currency),
    TxCommission.create(commission),
  ] as const

  return results
}

/**
 * @class
 * Transaction aggregate root
 *
 * @classdesc
 * Represents a transaction
 *
 * @property {TxID} id - The transaction id
 * @property {ClientID} clientId - The client id
 * @property {TxAmount} amount - The transaction amount
 * @property {TxCurrency} currency - The transaction currency
 * @property {TxCommission} commission - The transaction commission
 * @property {Date} createdAt - The transaction creation date
 */
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
  protected constructor(
    props: Omit<Props<Transaction>, 'createdAt'>,
    id?: TxID,
    createdAt?: Date
  ) {
    super({ ...props, createdAt: createdAt || new Date() }, id)
  }

  /**
   * Creates a new transaction from a DTO, enforcing the invariants.
   * @param dto
   * @returns a new valid Transaction object
   */
  static create({
    id,
    ...props
  }: Omit<TransactionDTO, 'createdAt'>): Result<Transaction> {
    const [txId, ...results] = createProps({ id, ...props })

    const result = Result.combine<Transaction>([txId, ...results])
    if (result.isFail) return result

    const tx = Reflect.construct(Transaction, [])
    const event: TransactionCreated = TransactionCreated.with(
      {
        ...props,
        createdAt: new Date(),
      },
      txId.data
    )
    tx.apply(event)

    return Result.ok(tx)
  }

  protected onTransactionCreated(event: TransactionCreated) {
    const [id, clientId, amount, currency, commission] = createProps({
      ...event.payload,
      id: event.aggregateId,
    })
    this.id = id.data
    this.props.clientId = clientId.data
    this.props.amount = amount.data
    this.props.currency = currency.data
    this.props.commission = commission.data
    this.props.createdAt =
      event.payload.createdAt ?? this.props.createdAt ?? new Date()
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
