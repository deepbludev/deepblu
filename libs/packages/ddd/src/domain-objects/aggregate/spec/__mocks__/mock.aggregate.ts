import { Result } from '../../../base/result'
import { UniqueID } from '../../../uid/unique-id.vo'
import { DomainEvent } from '../../../event/domain-event'
import { domainEvent } from '../../../event/domain-event.decorator'
import { BaseAggregate, IAggregateProps } from '../../base-aggregate.abstract'
import { createEvent } from '../../../event/create-event-from-as.util'

export interface MockAggregateProps extends IAggregateProps {
  foo: string
  is: boolean
}

export class MockAggregate extends BaseAggregate<MockAggregateProps> {
  protected constructor(id?: UniqueID) {
    super({}, id)
  }

  // factory method
  static create(
    props: MockAggregateProps,
    id?: UniqueID
  ): Result<MockAggregate> {
    const aggregate = new MockAggregate(id)
    aggregate.applyChange(new MockAggregateCreated(aggregate.id.value, props))
    return Result.ok(aggregate)
  }

  protected onMockAggregateCreated(event: MockPropsUpdated): void {
    this.id = UniqueID.from(event.aggregateId).data as UniqueID
    this.props.foo = event.payload.foo
    this.props.is = !!event.payload.is
  }

  updateProps(payload: Partial<MockAggregateProps>): void {
    this.applyChange(new MockPropsUpdated(this.id.value, payload))
  }

  protected onMockPropsUpdated(event: MockPropsUpdated): void {
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

/**
 * @event MockAggregateCreated
 * @description Event fired after a new MockAggregate is created.
 */
export const MockAggregateCreated = createEvent()
  .as<MockAggregateProps>('MockAggregateCreated')
  .from(MockAggregate.name)

/**
 * @event MockPropsUpdated
 * @description Event fired after updating the props of a MockAggregate.
 */
@domainEvent(MockAggregate.name)
export class MockPropsUpdated extends DomainEvent {
  constructor(
    id: string,
    public readonly payload: Partial<MockAggregateProps>
  ) {
    super(id)
  }
}