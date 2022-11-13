import { z } from 'zod'
import { TransactionSchema } from './transaction.dto'

export const CreateTransactionSchema = TransactionSchema.pick({
  id: true,
  clientId: true,
  amount: true,
  currency: true,
})

export type CreateTransactionDTO = z.infer<typeof CreateTransactionSchema>
