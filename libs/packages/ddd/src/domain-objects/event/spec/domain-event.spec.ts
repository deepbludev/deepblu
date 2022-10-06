import { Event } from '../../event/event'
import { BaseAggregate } from '../../aggregate/base-aggregate.abstract'
import { UniqueID } from '../../uid/unique-id.vo'

interface TestProps {
  foo: string
  is: boolean
}

class TestAggregate extends BaseAggregate<TestProps> {
  constructor(props: TestProps, id?: UniqueID) {
    super(props, id)
  }
}

class TestEvent extends Event<TestAggregate, TestProps> {
  constructor(aggregate: TestAggregate) {
    super(aggregate, { foo: 'foo', is: true })
  }
}

describe('Event', () => {
  const aggregate = new TestAggregate({ foo: 'bar', is: true })
  const event = new TestEvent(aggregate)

  it('should have a timestamp', () => {
    expect(event.timestamp).toBeGreaterThan(0)
  })

  it('should have a payload', () => {
    expect(event.payload).toEqual({ foo: 'foo', is: true })
  })

  it('should have an aggregate', () => {
    expect(event.aggregate).toBeDefined()
  })

  it('should have an aggregate name', () => {
    expect(event.aggregateName).toEqual('TestAggregate')
  })

  it('should have an aggregate id', () => {
    expect(event.aggregateId).toEqual(aggregate.id.value)
  })
})
