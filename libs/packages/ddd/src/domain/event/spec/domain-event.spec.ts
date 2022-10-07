import { BaseAggregate } from '../../aggregate/base-aggregate.abstract'
import { UniqueID } from '../../uid/unique-id.vo'
import { DomainEvent } from '../domain-event'
import { domainEvent } from '../utils/domain-event.decorator'

interface Props {
  foo: string
  is: boolean
}

class TestAggregate extends BaseAggregate<Props> {
  constructor(props: Props, id?: UniqueID) {
    super(props, id)
  }

  create(payload: Partial<Props>): TestAggregate {
    this.applyChange(new Created(this.id.value, payload as Props))
    return this
  }
}

@domainEvent(TestAggregate.name)
class Created extends DomainEvent {
  constructor(id: string, public readonly payload: Props) {
    super(id)
  }
}

class TestEvent extends DomainEvent {
  static override aggregate = 'TestAggregate'
  constructor(id: string, public readonly payload: Props) {
    super(id)
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
    expect(event.name).toEqual('TestEvent')
  })

  it('should have an aggregate name', () => {
    expect(event.aggregateName).toEqual('TestAggregate')
  })

  it('should have an aggregate id', () => {
    expect(event.aggregateId).toEqual(aggregate.id.value)
  })
})
