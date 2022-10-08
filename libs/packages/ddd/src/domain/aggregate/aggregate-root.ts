import { UUID } from '../uid/uuid.vo'
import { unique } from '../entity/utils/unique.decorator'
import {
  BaseAggregateRoot,
  IAggregateProps,
} from './base-aggregate-root.abstract'

/**
 * @class Aggregate
 * Aggregate class using UUID as ID.
 */
@unique(UUID)
export class AggregateRoot<P extends IAggregateProps> extends BaseAggregateRoot<
  P,
  UUID
> {
  constructor(props: P, id?: UUID) {
    super(props, id)
  }
}
