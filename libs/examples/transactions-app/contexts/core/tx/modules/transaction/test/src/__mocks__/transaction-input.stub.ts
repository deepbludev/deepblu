import { Currency } from '@deepblu/examples/transactions-app/contexts/core/tx/shared/domain'
import { CreateTransactionRequestDTO } from '@deepblu/examples/transactions-app/contexts/core/tx/modules/transaction/ui'

export const txInputStub = (
  props: Partial<CreateTransactionRequestDTO>
): CreateTransactionRequestDTO => ({
  date: props.date ?? new Date().toISOString().split('T')[0],
  amount: props.amount ?? 1000.0,
  currency: props.currency ?? Currency.EUR,
  clientId: props.clientId || '1',
})
