import { Constructor } from '../../interfaces'
import {
  BaseAggregate,
  IAggregateProps,
} from '../aggregate/base-aggregate.abstract'

export function eventFrom(
  aggregateClass: Constructor<BaseAggregate<IAggregateProps>>
) {
  return function (target: Constructor & { aggregate: string }) {
    target.aggregate = aggregateClass.name
    return target
  }
}
