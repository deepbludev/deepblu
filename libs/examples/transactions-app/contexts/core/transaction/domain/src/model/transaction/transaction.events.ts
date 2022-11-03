import { DomainEvent, domainEvent } from '@deepblu/ddd'
import { TransactionDTO } from './dto/transaction.dto'

@domainEvent('Transaction')
export class TransactionCreated extends DomainEvent<
  Omit<TransactionDTO, 'id'>
> {}
