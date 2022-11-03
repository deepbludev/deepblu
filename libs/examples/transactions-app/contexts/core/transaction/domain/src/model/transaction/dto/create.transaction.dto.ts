import { z } from 'zod'
import { TransactionSchema } from '@deepblu/examples/transactions-app/contexts/core/transaction/domain'

export const CreateTransactionSchema = TransactionSchema.pick({
  id: true,
  clientId: true,
  amount: true,
  currency: true,
})

export type CreateTransactionDTO = z.infer<typeof CreateTransactionSchema>
