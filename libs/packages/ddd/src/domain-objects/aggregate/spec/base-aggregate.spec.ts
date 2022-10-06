import { Result } from '../../base/result'
import { DomainEvent } from '../../event/domain-event'
import { eventFrom } from '../../event/event-from.decorator'
import { UniqueID } from '../../uid/unique-id.vo'
import { BaseAggregate, IAggregateProps } from '../base-aggregate.abstract'

interface Props extends IAggregateProps {
  foo: string
  is: boolean
}

type ProsUpdatedPayload = Partial<Props>
class TestAggregate extends BaseAggregate<Props> {
  protected constructor(id?: UniqueID) {
    super({}, id)
  }

  // factory method
  static create(props: Props, id?: UniqueID): Result<TestAggregate> {
    const aggregate = new TestAggregate(id)
    aggregate.applyChange(new Created(aggregate.id.value, props))
    return Result.ok(aggregate)
  }

  protected applyCreated(event: PropsUpdated): void {
    this.id = UniqueID.from(event.aggregateId).data as UniqueID
    this.props.foo = event.payload.foo
    this.props.is = !!event.payload.is
  }

  updateProps(payload: ProsUpdatedPayload): void {
    this.applyChange(new PropsUpdated(this.id.value, payload))
  }

  protected applyPropsUpdated(event: PropsUpdated): void {
    this.props.foo = event.payload.foo || this.props.foo
    this.props.is = Reflect.has(event.payload, 'is')
      ? !!event.payload.is
      : this.props.is
  }

  get foo(): string {
    return this.props.foo || ''
  }

  get is(): boolean {
    return !!this.props.is
  }
}

@eventFrom(TestAggregate.name)
class Created extends DomainEvent {
  constructor(id: string, public readonly payload: Props) {
    super(id)
  }
}

@eventFrom(TestAggregate.name)
class PropsUpdated extends DomainEvent {
  constructor(id: string, public readonly payload: ProsUpdatedPayload) {
    super(id)
  }
}

describe('AggregateBase', () => {
  it('should be defined', () => {
    expect(BaseAggregate).toBeDefined()
  })

  const aggregate = TestAggregate.create({ foo: 'bar', is: true }).data

  it('should be a Aggregate domain object type', () => {
    expect(aggregate.domainObjectType).toEqual('Aggregate')
  })

  it('should have a hashcode based on its id, class name and domain object type', () => {
    const expectedHashCode = UniqueID.from(
      `[Aggregate@TestAggregate]:${aggregate.id.value}`
    ).data
    expect(aggregate.hashcode.equals(expectedHashCode)).toBeTruthy()
  })

  it('should have a new uncommited event after a new event is applied', () => {
    aggregate.updateProps({ foo: 'bar2', is: false })
    expect(aggregate.changes.length).toEqual(2)
    expect(aggregate.props).toEqual({ foo: 'bar2', is: false })
    aggregate.updateProps({ is: true })
    expect(aggregate.changes.length).toEqual(3)
    expect(aggregate.props).toEqual({ foo: 'bar2', is: true })
  })

  it('should have no uncommited events after changes are commited', () => {
    const changes = aggregate.changes
    expect(aggregate.commit()).toEqual(changes)
    expect(aggregate.changes.length).toEqual(0)
  })

  it('should be able to be rehydrated from a list of events', () => {
    const original = TestAggregate.create({ foo: 'bar', is: true }).data
    original.updateProps({ foo: 'bar2', is: false })
    original.updateProps({ is: true })
    const changes = original.changes
    const rehydrated = TestAggregate.rehydrate<TestAggregate>(
      original.id,
      changes
    )
    expect(rehydrated.equals(original)).toBeTruthy()
    expect(rehydrated.changes.length).toEqual(0)
    expect(original.changes.length).toEqual(3)
  })
})
