import { Currencies } from '@deepblu/examples/transactions-app/contexts/shared/domain'
import { CreateTransactionDTO } from '../model/transaction/dto/create.transaction.dto'

export const createTxDTOStub = (
  props?: Partial<CreateTransactionDTO>
): CreateTransactionDTO => ({
  id: props?.id || '88cc384c-eb13-4eee-af43-9f64c36f9e99',
  clientId: props?.clientId || '88cc384c-eb13-4eee-af43-9f64c36f9e98',
  amount: props?.amount ?? 1000.0,
  currency: props?.currency ?? Currencies.EUR,
})
