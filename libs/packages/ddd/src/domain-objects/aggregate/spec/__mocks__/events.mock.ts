import { DomainEvent } from '../../../event/domain-event'
import { eventFrom } from '../../../event/event-from.decorator'
import { MockAggregate, MockProps, name } from './mock.aggregate'

@eventFrom(name)
export class MockCreated extends DomainEvent {
  constructor(id: string, public readonly payload: MockProps) {
    super(id)
  }
}

export type MockPropsUpdatedPayload = Partial<MockProps>
@eventFrom(name)
export class MockPropsUpdated extends DomainEvent {
  constructor(id: string, public readonly payload: MockPropsUpdatedPayload) {
    super(id)
  }
}
