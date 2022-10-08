import { Result } from '../../../core/result'
import { DomainEventFrom } from '../../../event/domain-event'
import { Payload } from '../../../types'
import { UniqueID } from '../../../uid/unique-id.vo'
import { BaseAggregate, IAggregateProps } from '../../base-aggregate.abstract'
import {
  MockAggregateCreated,
  MockPropsUpdated,
  MockToggled,
} from './events.mock.aggregate'

export type MockAggregateProps = IAggregateProps &
  Payload<typeof MockAggregateCreated>

export class MockAggregate extends BaseAggregate<MockAggregateProps> {
  protected constructor(props: MockAggregateProps, id?: UniqueID) {
    super(props, id)
  }

  /**
   * Creates a new mock aggregate from initial props
   * @factory
   * @command CreateMockAggregate
   * @param aggregateId - the id of the aggregate
   * @param payload - the aggregate props on creation
   */

  static create(
    payload: Payload<typeof MockAggregateCreated>,
    id?: UniqueID
  ): Result<MockAggregate> {
    const aggregate = new MockAggregate(payload, id)
    aggregate.applyChange(new MockAggregateCreated(payload, aggregate.id.value))
    return Result.ok(aggregate)
  }

  protected _onMockAggregateCreated(
    event: DomainEventFrom<typeof MockAggregateCreated>
  ): void {
    this.id = UniqueID.from(event.aggregateId).data
    this.props.foo = event.payload.foo || ''
    this.props.is = !!event.payload.is
  }

  /**
   * @command UpdateMockProps - update the aggregate props
   * @param payload - the props to update
   */

  updateProps(payload: Payload<typeof MockPropsUpdated>): void {
    this.applyChange(new MockPropsUpdated(payload, this.id.value))
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
    this.applyChange(new MockToggled({}, this.id.value))
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
