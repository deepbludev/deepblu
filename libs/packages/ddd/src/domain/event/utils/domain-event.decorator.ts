import { Constructor } from '../../types'

export function domainEvent(aggregateClass: string) {
  return function (target: Constructor & { aggregate: string }) {
    target.aggregate = aggregateClass
    return target
  }
}
