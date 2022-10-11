/* eslint-disable @typescript-eslint/no-explicit-any */
import { Constructor } from '../../types'
import { IUniqueID } from '../../uid/unique-id.vo'

export function domainEvent(aggregateClass: string) {
  return function (
    target: Constructor & {
      aggregate: string
      with: (payload: any, id: IUniqueID) => any
      from: (event: any) => any
    }
  ) {
    target.aggregate = aggregateClass
    return target
  }
}
