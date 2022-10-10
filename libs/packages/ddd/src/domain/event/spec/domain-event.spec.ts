import { IAggregateRoot } from '../../aggregate/base-aggregate-root.abstract'
import { UniqueID } from '../../uid/unique-id.vo'
import { DomainEvent } from '../domain-event'
import { EventID } from '../event-id.vo'
import { createDomainEvent } from '../utils/create-domain-event-as-from.util'
import { domainEvent } from '../utils/domain-event.decorator'

interface Props {
  foo: string
  is: boolean
}

class TestAggregate extends IAggregateRoot<Props> {
  constructor(props: Props, id?: UniqueID) {
    super(props, id)
  }

  create(payload: Partial<Props>): TestAggregate {
    this.apply(new Created(payload as Props, this.id))
    return this
  }
}

@domainEvent(TestAggregate.name)
class Created extends DomainEvent {
  constructor(payload: Props, aggId: UniqueID, id?: EventID) {
    super(payload, aggId, id)
  }
}

class TestEvent extends DomainEvent {
  static override aggregate = TestAggregate.name
  constructor(payload: Props, aggId: UniqueID, id?: EventID) {
    super(payload, aggId, id)
  }
}

const OtherTestEvent = createDomainEvent<{ foo: string; is: boolean }>()
  .as('OtherTestEvent')
  .from(TestAggregate.name)

const EventWithoutPayload = createDomainEvent()
  .as('EventWithoutPayload')
  .from(TestAggregate.name)

describe('Event', () => {
  const payload = { foo: 'bar', is: true }
  const aggregate = new TestAggregate(payload)
  const event = new TestEvent(payload, aggregate.id)
  const otherEvent = OtherTestEvent.with(payload, aggregate.id)
  const eventWithoutPayload = new EventWithoutPayload({}, aggregate.id)

  it('should have an id', () => {
    expect(event.id).toBeDefined()
  })

  it('should be able to receive an id on creation', () => {
    const id = EventID.create()
    const event = new TestEvent(payload, aggregate.id, id)
    expect(event.id.equals(id)).toBeTruthy()
  })

  it("should generate it's own id if none is provided", () => {
    const event = new TestEvent(payload, aggregate.id)
    expect(EventID.validate(event.id.value)).toBeTruthy()
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

  it('should have an aggregate id', () => {
    expect(event.aggregateId.equals(aggregate.id)).toBeTruthy()
    expect(otherEvent.aggregateId.equals(aggregate.id)).toBeTruthy()
    expect(eventWithoutPayload.aggregateId.equals(aggregate.id)).toBeTruthy()
  })
})