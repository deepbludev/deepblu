import { UUID } from '../uid/uuid.vo'
import { unique } from '../entity/utils/unique.decorator'
import { IAggregateRoot, IAggregateProps } from './aggregate-root.abstract'

/**
 * @class Aggregate
 * Aggregate class using UUID as ID.
 */
@unique(UUID)
export class AggregateRoot<P extends IAggregateProps> extends IAggregateRoot<
  UUID,
  P
> {
  constructor(props: P, id?: UUID) {
    super(props, id)
  }
}
