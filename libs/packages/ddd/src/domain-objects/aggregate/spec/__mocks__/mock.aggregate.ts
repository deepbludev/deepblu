import { Result } from '../../../base/result'
import { UniqueID } from '../../../uid/unique-id.vo'
import {
  MockCreated,
  MockPropsUpdated,
  MockPropsUpdatedPayload,
} from './events.mock'
import { BaseAggregate, IAggregateProps } from '../../base-aggregate.abstract'

export interface MockProps extends IAggregateProps {
  foo: string
  is: boolean
}

export class MockAggregate extends BaseAggregate<MockProps> {
  protected constructor(id?: UniqueID) {
    super({}, id)
  }

  // factory method
  static create(props: MockProps, id?: UniqueID): Result<MockAggregate> {
    const aggregate = new MockAggregate(id)
    aggregate.applyChange(new MockCreated(aggregate.id.value, props))
    return Result.ok(aggregate)
  }

  protected onMockCreated(event: MockPropsUpdated): void {
    this.id = UniqueID.from(event.aggregateId).data as UniqueID
    this.props.foo = event.payload.foo
    this.props.is = !!event.payload.is
  }

  updateProps(payload: MockPropsUpdatedPayload): void {
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

export const name = MockAggregate.name
