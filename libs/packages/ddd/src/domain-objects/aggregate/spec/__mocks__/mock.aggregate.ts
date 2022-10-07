import { Result } from '../../../base/result'
import { UniqueID } from '../../../uid/unique-id.vo'
import { DomainEvent } from '../../../event/domain-event'
import { domainEvent } from '../../../event/domain-event.decorator'
import { BaseAggregate, IAggregateProps } from '../../base-aggregate.abstract'
import { createEvent } from '../../../event/create-event-from-as.util'

export interface MockAggregateProps extends IAggregateProps {
  foo: string
  is?: boolean
}

export class MockAggregate extends BaseAggregate<MockAggregateProps> {
  protected constructor(props: MockAggregateProps, id?: UniqueID) {
    super(props, id)
  }

  /**
   * @command CreateMockAggregate - create a new mock aggregate
   * @param aggregateId - the id of the aggregate
   * @param payload - the payload of the command
   */

  // factory
  static create(
    payload: MockAggregateProps,
    id?: UniqueID
  ): Result<MockAggregate> {
    const aggregate = new MockAggregate(payload, id)
    aggregate.applyChange(new MockAggregateCreated(aggregate.id.value, payload))
    return Result.ok(aggregate)
  }

  protected _onMockAggregateCreated(event: MockPropsUpdated): void {
    this.id = UniqueID.from(event.aggregateId).data as UniqueID
    this.props.foo = event.payload.foo || ''
    this.props.is = !!event.payload.is
  }

  /**
   * @command UpdateMockProps - update the aggregate props
   * @param payload - the props to update
   */

  updateProps(payload: Partial<MockAggregateProps>): void {
    this.applyChange(new MockPropsUpdated(this.id.value, payload))
  }

  protected _onMockPropsUpdated(event: MockPropsUpdated): void {
    this.props.foo = event.payload.foo || this.props.foo
    this.props.is = Reflect.has(event.payload, 'is')
      ? !!event.payload.is
      : this.props.is
  }

  /**
   * @command Toggle - toggle 'is' prop
   */

  toggle(): void {
    this.applyChange(new MockToggled(this.id.value))
  }

  protected _onMockToggled(): void {
    this.props.is = !this.props.is
  }

  /** getters */

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

/**
 * @event MockToggled
 * @description Event fired after toggling the 'is' property of a MockAggregate.
 */
export const MockToggled = createEvent()
  .as('MockToggled')
  .from(MockAggregate.name)
