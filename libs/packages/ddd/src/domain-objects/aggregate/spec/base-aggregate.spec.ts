import { unique } from '../../entity/unique.decorator'
import { DomainEvent } from '../../event/domain-event'
import { eventFrom } from '../../event/event-from.decorator'
import { UniqueID } from '../../uid/unique-id.vo'
import { UUID } from '../../uid/uuid.vo'
import { BaseAggregate, IAggregateProps } from '../base-aggregate.abstract'

interface Props extends IAggregateProps {
  foo: string
  is: boolean
}

type ProsUpdatedPayload = Partial<Props>
@unique(UUID)
class TestAggregate extends BaseAggregate<Props, UUID> {
  constructor(props: Props, id?: UUID) {
    super(props, id)
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
}

@eventFrom(TestAggregate)
class PropsUpdated extends DomainEvent {
  constructor(id: string, public readonly payload: ProsUpdatedPayload) {
    super(id)
  }
}

describe('AggregateBase', () => {
  it('should be defined', () => {
    expect(BaseAggregate).toBeDefined()
  })

  const aggregate = new TestAggregate({ foo: 'bar', is: true })

  it('should be a Aggregate domain object type', () => {
    expect(aggregate.domainObjectType).toEqual('Aggregate')
  })

  it('should have a hashcode based on its id, class name and domain object type', () => {
    const expectedHashCode = UniqueID.from(
      `[Aggregate@TestAggregate]:${aggregate.id.value}`
    ).data
    expect(aggregate.hashcode.equals(expectedHashCode)).toBeTruthy()
  })

  it('should have version 0 after creation', () => {
    expect(aggregate.version).toEqual(0)
  })

  it('should have a new uncommited event after a new event is applied', () => {
    aggregate.updateProps({ foo: 'bar2', is: false })
    expect(aggregate.changes.length).toEqual(1)
    expect(aggregate.props).toEqual({ foo: 'bar2', is: false })
    aggregate.updateProps({ is: true })
    expect(aggregate.changes.length).toEqual(2)
    expect(aggregate.props).toEqual({ foo: 'bar2', is: true })
  })

  it('should have no uncommited events after changes are commited', () => {
    const changes = aggregate.changes
    expect(aggregate.commit()).toEqual(changes)
    expect(aggregate.changes.length).toEqual(0)
  })
})
