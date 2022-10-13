/* eslint-disable @typescript-eslint/no-explicit-any */
import { Constructor } from '../../../../domain/types'

export function eventstream(aggregateClass: string) {
  return function (target: Constructor & { aggregate: string }) {
    target.aggregate = aggregateClass
    return target
  }
}
