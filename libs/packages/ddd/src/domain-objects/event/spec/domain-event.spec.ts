import { BaseAggregate } from '../../aggregate/base-aggregate.abstract'
import { UniqueID } from '../../uid/unique-id.vo'
import { DomainEvent } from '../domain-event'
import { eventFrom } from '../event-from.decorator'

interface TestProps {
  foo: string
  is: boolean
}

class TestAggregate extends BaseAggregate<TestProps> {
  constructor(props: TestProps, id?: UniqueID) {
    super(props, id)
  }
}

@eventFrom(TestAggregate)
class TestEvent extends DomainEvent<TestProps> {
  constructor(id: string, payload: TestProps) {
    super(id, payload)
  }
}

describe('Event', () => {
  const payload = { foo: 'bar', is: true }
  const aggregate = new TestAggregate(payload)
  const event = new TestEvent(aggregate.id.value, payload)

  it('should have a timestamp', () => {
    expect(event.timestamp).toBeGreaterThan(0)
  })

  it('should have a payload', () => {
    expect(event.payload).toEqual({ foo: 'bar', is: true })
  })

  it('should have an event name set to the class name and aggregate name', () => {
    expect(event.eventName).toEqual('TestAggregate.TestEvent')
  })

  it('should have an aggregate name', () => {
    expect(event.aggregateName).toEqual('TestAggregate')
  })

  it('should have an aggregate id', () => {
    expect(event.aggregateId).toEqual(aggregate.id.value)
  })
})
