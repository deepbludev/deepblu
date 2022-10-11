import { DomainEvent } from '../event/domain-event'
import { domainEvent } from '../event/utils/domain-event.decorator'
import { Payload, Props } from '../types'
import { MockAggregate } from './mock.aggregate'

@domainEvent('MockAggregate')
export class MockAggregateCreated extends DomainEvent<Props<MockAggregate>> {}

@domainEvent('MockAggregate')
export class MockPropsUpdated extends DomainEvent<
  Partial<Payload<MockAggregateCreated>>
> {}

@domainEvent('MockAggregate')
export class MockAggregateToggled extends DomainEvent {}
