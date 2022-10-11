import { IAggregateRoot } from '../aggregate-root/aggregate-root.abstract'
import { Result } from '../core/result'
import { Payload } from '../types'
import { IUniqueID } from '../uid/unique-id.vo'
import {
  MockAggregateCreated,
  MockPropsUpdated,
  MockAggregateToggled,
} from './mock.events'

export class MockAggregate extends IAggregateRoot<{
  foo: string
  bar?: number
  is?: boolean
}> {
  /**
   * Creates a new mock aggregate from initial props
   * @factory
   * @command CreateMockAggregate
   * @event MockAggregateCreated
   * @param aggregateId - the id of the aggregate
   * @param payload - the aggregate props on creation
   */

  static create(
    payload: Payload<MockAggregateCreated>,
    id?: IUniqueID
  ): Result<MockAggregate> {
    const aggregate = new MockAggregate(payload, id)
    aggregate.apply(MockAggregateCreated.with(payload, aggregate.id))
    return Result.ok(aggregate)
  }

  protected onMockAggregateCreated(event: MockAggregateCreated): void {
    this.id = IUniqueID.from(event.aggregateId).data
    this.props.foo = event.payload.foo || ''
    this.props.is = !!event.payload.is
  }

  /**
   * Updates the mock aggregate props to the given values
   * @command UpdateMockProps - update the aggregate props
   * @event MockPropsUpdated
   * @param payload - the props to update
   */

  updateProps(payload: Payload<MockPropsUpdated>): void {
    this.apply(MockPropsUpdated.with(payload, this.id))
  }

  protected onMockPropsUpdated(event: MockPropsUpdated): void {
    this.props.foo = event.payload.foo || this.props.foo
    this.props.is = Reflect.has(event.payload, 'is')
      ? !!event.payload.is
      : this.props.is
  }

  /**
   * Toggles the mock aggregate state
   * @command ToggleMockAggregate
   * @event MockAggregateToggled
   */

  toggle(): void {
    this.apply(MockAggregateToggled.with({}, this.id))
  }

  protected onMockAggregateToggled(): void {
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
