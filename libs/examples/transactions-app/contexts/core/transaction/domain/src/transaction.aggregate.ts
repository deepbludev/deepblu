import { AggregateRoot, Result } from '@deepblu/ddd'
import { CreateTransactionDTO, TransactionDTO } from './transaction.dto'

export class TransactionAggregate extends AggregateRoot<TransactionDTO> {
  static create(props: CreateTransactionDTO): Result<TransactionAggregate> {
    const tx = new TransactionAggregate({ ...props, commission: 0.05 })
    return Result.ok(tx)
  }
}
