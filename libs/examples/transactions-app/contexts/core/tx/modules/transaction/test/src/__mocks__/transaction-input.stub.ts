import { Currency } from '@deepblu/examples/transactions-app/contexts/core/tx/shared/domain'
import { CreateTransactionDTO } from '@deepblu/examples/transactions-app/contexts/core/tx/modules/transaction/ui'

export const txInputStub = (
  props?: Partial<CreateTransactionDTO>
): CreateTransactionDTO => ({
  date: props?.date ?? new Date().toISOString().split('T')[0],
  amount: props?.amount ?? 1000.0,
  currency: props?.currency ?? Currency.EUR,
  clientId: props?.clientId || '88cc384c-eb13-4eee-af43-9f64c36f9e98',
})
