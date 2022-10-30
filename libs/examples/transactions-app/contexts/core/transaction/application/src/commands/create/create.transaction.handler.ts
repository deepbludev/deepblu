import { Injectable } from '@nestjs/common'
import {
  commandHandler,
  CommandResponse,
  ICommandHandler,
  Result,
  UUID,
} from '@deepblu/ddd'
import {
  TransactionAggregate,
  TransactionRepo,
} from '@deepblu/examples/transactions-app/contexts/core/transaction/domain'
import { CreateTransaction } from './create.transaction.command'

@Injectable()
@commandHandler(CreateTransaction)
export class CreateTransactionHandler extends ICommandHandler<CreateTransaction> {
  constructor(private readonly repo: TransactionRepo) {
    super()
  }

  async handle({ payload }: CreateTransaction): CommandResponse {
    const { data: id } = UUID.from(payload.id)

    // TODO: throw custom error if transaction already exists
    if (await this.repo.exists(id))
      return Result.fail(new Error('Transaction already exists'))

    const { data: tx, isFail, error } = TransactionAggregate.create(payload)
    if (isFail) return Result.fail(error)

    await this.repo.save(tx)
    return Result.ok()
  }
}
