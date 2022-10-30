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

  async handle(command: CreateTransaction): CommandResponse {
    if (await this.repo.exists(UUID.from(command.payload.id).data))
      return Result.fail(new Error('Transaction already exists'))

    const result = TransactionAggregate.create(command.payload)
    if (result.isFail) return Result.fail(result.error)

    await this.repo.save(result.data)

    return Result.ok()
  }
}
