import {
  commandHandler,
  CommandResponse,
  ICommandHandler,
  Result,
} from '@deepblu/ddd'
import { CreateTransaction } from './create.transaction.command'

@commandHandler(CreateTransaction)
export class CreateTransactionHandler extends ICommandHandler<CreateTransaction> {
  async handle<E extends Error>(
    command: CreateTransaction
  ): CommandResponse<E> {
    console.log({ command })
    return Result.ok()
  }
}
