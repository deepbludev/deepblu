import { UUID } from '../uid/uuid.vo'
import { unique } from '../entity/utils/unique.decorator'
import { BaseAggregate, IAggregateProps } from './base-aggregate.abstract'

/**
 * @class Aggregate
 * Aggregate class using UUID as ID.
 */
@unique(UUID)
export class Aggregate<P extends IAggregateProps> extends BaseAggregate<
  P,
  UUID
> {
  constructor(props: P, id?: UUID) {
    super(props, id)
  }
}
