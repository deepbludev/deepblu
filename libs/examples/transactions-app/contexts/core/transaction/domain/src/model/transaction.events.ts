import { DomainEvent, domainEvent } from '@deepblu/ddd'
import { TransactionDTO } from '../dto/create.transaction.dto'

@domainEvent('Transaction')
export class TransactionCreated extends DomainEvent<TransactionDTO> {}