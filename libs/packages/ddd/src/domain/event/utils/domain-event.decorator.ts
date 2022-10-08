/* eslint-disable @typescript-eslint/no-explicit-any */
import { Constructor } from '../../types'

export function domainEvent(aggregateClass: string) {
  return function (
    target: Constructor & {
      aggregate: string
      with: (payload: any, id: string) => any
    }
  ) {
    target.aggregate = aggregateClass
    return target
  }
}
