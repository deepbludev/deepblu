import { IAggregateRoot } from '../../aggregate-root/aggregate-root.abstract'
import { Props } from '../../types'
import { IUniqueID } from '../../uid/unique-id.vo'
import { DomainEvent } from '../domain-event.abstract'
import { DomainEventID } from '../domain-event-id.vo'
import { domainEvent } from '../utils/domain-event.decorator'

interface TestProps {
  foo: string
  is: boolean
}

class TestAggregate extends IAggregateRoot<IUniqueID, TestProps> {
  constructor(props: TestProps, id?: IUniqueID) {
    super(props, id)
  }

  create(payload: TestProps): TestAggregate {
    this.apply(new Created(payload, this.id.value))
    return this
  }
}

@domainEvent(TestAggregate.name)
class Created extends DomainEvent<Props<TestAggregate>> {}

class TestEvent extends DomainEvent<TestProps> {
  static override aggregate = TestAggregate.name
}

@domainEvent(TestAggregate.name)
class OtherTestEvent extends DomainEvent<{ foo: string; is: boolean }> {}

@domainEvent(TestAggregate.name)
class EventWithoutPayload extends DomainEvent {}

describe(DomainEvent, () => {
  const payload = { foo: 'bar', is: true }
  const aggregate = new TestAggregate(payload)
  const event = new TestEvent(payload, aggregate.id.value)
  const otherEvent: OtherTestEvent = OtherTestEvent.with(aggregate.id, payload)
  const eventWithoutPayload = EventWithoutPayload.with(aggregate.id, {})

  it('should have an id', () => {
    expect(event.id).toBeDefined()
  })

  it('should be able to receive an id on creation', () => {
    const id = DomainEventID.create().value
    const event = new TestEvent(payload, aggregate.id.value, id)
    expect(event.id).toEqual(id)
  })

  it("should generate it's own id if none is provided", () => {
    const event = new TestEvent(payload, aggregate.id.value)
    expect(DomainEventID.validate(event.id)).toBeTruthy()
  })

  it('should have a timestamp', () => {
    expect(event.timestamp).toBeGreaterThan(0)
    expect(otherEvent.timestamp).toBeGreaterThan(0)
    expect(eventWithoutPayload.timestamp).toBeGreaterThan(0)
  })

  it('should have a payload', () => {
    expect(event.payload).toEqual({ foo: 'bar', is: true })
    expect(otherEvent.payload).toEqual({ foo: 'bar', is: true })
    expect(eventWithoutPayload.payload).toEqual({})
  })

  it('should have an event name set to the class name and aggregate name', () => {
    expect(event.name).toEqual('TestEvent')
    expect(otherEvent.name).toEqual('OtherTestEvent')
    expect(eventWithoutPayload.name).toEqual('EventWithoutPayload')
  })

  it('should have an aggregate name', () => {
    expect(event.aggregateName).toEqual('TestAggregate')
    expect(otherEvent.aggregateName).toEqual('TestAggregate')
    expect(eventWithoutPayload.aggregateName).toEqual('TestAggregate')
  })

  it('should have a canonical name using aggregate and event name in snake_case', () => {
    expect(event.canonical).toEqual('test_aggregate.test_event')
    expect(otherEvent.canonical).toEqual('test_aggregate.other_test_event')
    expect(eventWithoutPayload.canonical).toEqual(
      'test_aggregate.event_without_payload'
    )
  })

  it('should have an aggregate id', () => {
    expect(event.aggregateId).toEqual(aggregate.id.value)
    expect(otherEvent.aggregateId).toEqual(aggregate.id.value)
    expect(eventWithoutPayload.aggregateId).toEqual(aggregate.id.value)
  })

  it('should be able to be serialized', () => {
    const serialized = event.serialize()
    expect(serialized).toEqual({
      id: event.id,
      timestamp: event.timestamp,
      name: event.name,
      canonical: event.canonical,
      aggregateName: event.aggregateName,
      aggregateId: event.aggregateId,
      payload: event.payload,
    })
  })

  it('should be able to be deserialized', () => {
    const serialized = event.serialize()
    const deserialized = TestEvent.from<TestProps>(serialized)
    expect(deserialized).toBeInstanceOf(TestEvent)
    expect(deserialized).toEqual(event)
  })
})
