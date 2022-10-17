import { DomainEvent } from '../event/domain-event.abstract'
import { domainEvent } from '../event/utils/domain-event.decorator'
import { Payload, Props } from '../types'
import { AggregateStub } from './aggregate.stub'

@domainEvent('AggregateStub')
export class AggregateCreatedStub extends DomainEvent<Props<AggregateStub>> {}

@domainEvent('AggregateStub')
export class PropsUpdatedStub extends DomainEvent<
  Partial<Payload<AggregateCreatedStub>>
> {}

@domainEvent('AggregateStub')
export class AggregateToggledStub extends DomainEvent {}
