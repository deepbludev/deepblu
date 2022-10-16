import { Command, Props } from '..'
import { AggregateStub } from '.'

export class CreateAggregateStub extends Command<
  Props<AggregateStub> & { id: string }
> {}
