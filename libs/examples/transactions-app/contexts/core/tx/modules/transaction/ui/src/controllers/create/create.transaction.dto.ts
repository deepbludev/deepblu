import { string, z } from 'zod'
import {
  CURRENCIES,
  Currency,
} from '@deepblu/examples/transactions-app/contexts/core/tx/shared/domain'

export const CreateTransactionSchema = z.object({
  date: z.string().refine(v => !isNaN(Date.parse(v)), {
    message: 'Date must be a valid date',
  }),
  amount: z.number().positive({ message: 'Amount must be a positive number' }),
  currency: z
    .string()
    .refine((value: string) => CURRENCIES.includes(value as Currency), {
      message: 'Currency must be a valid currency (e.g. USD, EUR, GBP, JPY)',
    }),
  clientId: string().uuid({ message: 'Client ID must be a valid UUID' }),
})

export type CreateTransactionDTO = z.infer<typeof CreateTransactionSchema>
