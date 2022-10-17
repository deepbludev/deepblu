import { Query, Props } from '..'
import { AggregateStub } from '.'

export class AllAggregatesStub extends Query {}
export class FilteredAggregatesStub extends Query<
  Partial<Props<AggregateStub>>
> {}
export class ToggledAggregatesStub extends Query {}
