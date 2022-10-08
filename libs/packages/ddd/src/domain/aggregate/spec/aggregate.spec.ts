import { DomainEvent } from '../../event/domain-event'
import { domainEvent } from '../../event/utils/domain-event.decorator'
import { UUID } from '../../uid/uuid.vo'
import { Aggregate } from '../aggregate'

interface MockAggregateProps {
  foo: string
  is?: boolean
}

@domainEvent('MockAggregate')
export class MockAggregateCreated extends DomainEvent {
  constructor(id: string, payload: MockAggregateProps) {
    super(id, payload)
  }
}

class MockAggregate extends Aggregate<MockAggregateProps> {
  constructor(props: MockAggregateProps, id?: UUID) {
    super(props, id)
  }

  static create(props: MockAggregateProps, id?: UUID) {
    const aggregate = new MockAggregate(props, id)
    aggregate.applyChange(new MockAggregateCreated(aggregate.id.value, props))
    return aggregate
  }

  protected _onMockAggregateCreated(event: MockAggregateCreated) {
    this.id = UUID.from(event.aggregateId).data as UUID
    this.props.foo = event.payload.foo || ''
    this.props.is = !!event.payload.is
  }

  get is() {
    return !!this.props.is
  }

  get foo() {
    return this.props.foo
  }
}

describe('Aggregate', () => {
  it('should be defined', () => {
    expect(Aggregate).toBeDefined()
    expect(MockAggregate).toBeDefined()
  })

  it('should create an aggregate', () => {
    const aggregate = MockAggregate.create({ foo: 'bar' })
    expect(aggregate).toBeDefined()
    expect(aggregate.id).toBeDefined()
    expect(aggregate.props).toEqual({ foo: 'bar', is: false })
    expect(aggregate.is).toBeFalsy()
  })

  it('should be able to generate a snapshot', () => {
    const aggregate = MockAggregate.create({ foo: 'bar' })
    const snapshot = aggregate.snapshot()
    expect(snapshot).toBeDefined()
    expect(snapshot.equals(aggregate)).toBeTruthy()
    expect(snapshot.hasChanges).toBeFalsy()
  })

  it('should be able to be loaded from events', () => {
    const aggregate = MockAggregate.create({ foo: 'bar' })
    const loaded = MockAggregate.rehydrate<MockAggregate>(
      aggregate.id,
      aggregate.changes
    )
    expect(loaded).toBeDefined()
    expect(loaded.id).toBeDefined()
    expect(loaded.props).toEqual({ foo: 'bar', is: false })
    expect(loaded.is).toBeFalsy()
  })

  it('should be able to be rehydrated from events and a snapshot', () => {
    const original = MockAggregate.create({ foo: 'bar' })
    const snapshot: MockAggregate = original.snapshot()
    const rehydrated = MockAggregate.rehydrate<MockAggregate>(
      original.id,
      original.changes,
      snapshot
    )
    expect(rehydrated).toBeDefined()
    expect(rehydrated.id.equals(original.id)).toBeDefined()
    expect(rehydrated.props).toEqual({ foo: 'bar', is: false })
    expect(rehydrated.is).toBeFalsy()
    expect(rehydrated.version).toBe(0)
  })
})
