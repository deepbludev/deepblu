import { string, z } from 'zod'
import {
  CURRENCIES,
  Currencies,
} from '@deepblu/examples/transactions-app/contexts/shared/domain'

export const CreateTransactionSchema = z.object({
  id: string().uuid({ message: 'Transaction ID must be a valid UUID' }),
  clientId: string().uuid({ message: 'Client ID must be a valid UUID' }),
  amount: z.number().positive({ message: 'Amount must be a positive number' }),
  currency: z
    .string()
    .refine((value: string) => CURRENCIES.includes(value as Currencies), {
      message: 'Currency must be a valid currency (e.g. USD, EUR, GBP, JPY)',
    }),
})

export type CreateTransactionDTO = z.infer<typeof CreateTransactionSchema>

export type TransactionDTO = CreateTransactionDTO & {
  commission: number
  createdAt: Date
}
