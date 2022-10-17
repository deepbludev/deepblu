import {
  AggregateStub,
  AllAggregatesStub,
  FilteredAggregatesStub,
  ToggledAggregatesStub,
} from '../../domain/__mocks__'
import {
  queryHandler,
  IQueryHandler,
  Result,
  QueryResponse,
} from '../../domain'

export const aggregates = [
  AggregateStub.create({ foo: 'bar' }).data,
  AggregateStub.create({ foo: 'baz', is: true }).data,
]

@queryHandler(AllAggregatesStub)
export class AllAggregatesHandlerMock extends IQueryHandler<
  AllAggregatesStub,
  AggregateStub[]
> {
  _handle: jest.Mock = jest.fn()

  async handle<E extends Error>(
    query: AllAggregatesStub
  ): QueryResponse<AggregateStub[], E> {
    this._handle(query)
    return Result.ok<AggregateStub[], E>(aggregates)
  }
}

export class FilteredAggregatesHandlerMock extends IQueryHandler<FilteredAggregatesStub> {
  static override readonly subscription = FilteredAggregatesStub
  _handle: jest.Mock = jest.fn()

  async handle<E extends Error>(
    query: FilteredAggregatesStub
  ): QueryResponse<AggregateStub[], E> {
    this._handle(query)
    return Result.ok<AggregateStub[], E>([aggregates[0]])
  }
}

export class ToggledAggregatesHandlerMock extends IQueryHandler<ToggledAggregatesStub> {
  _handle: jest.Mock = jest.fn()

  override get subscription() {
    return ToggledAggregatesStub
  }

  async handle<E extends Error>(
    query: ToggledAggregatesStub
  ): QueryResponse<AggregateStub[], E> {
    this._handle(query)
    return Result.ok<AggregateStub[], E>([aggregates[1]])
  }
}

export class EmptyQueryHandlerMock extends IQueryHandler<ToggledAggregatesStub> {
  _handle: jest.Mock = jest.fn()

  async handle<E extends Error>(
    query: ToggledAggregatesStub
  ): QueryResponse<AggregateStub[], E> {
    this._handle(query)
    return Result.ok<AggregateStub[], E>([aggregates[1]])
  }
}
