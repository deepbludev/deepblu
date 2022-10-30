import { Command } from '@deepblu/ddd'
import { CreateTransactionDTO } from '@deepblu/examples/transactions-app/contexts/core/transaction/domain'

export class CreateTransaction extends Command<CreateTransactionDTO> {}
