/* eslint-disable @typescript-eslint/no-explicit-any */

import { Result } from '../core/result'
import { Constructor } from '../types'
import { IQuery } from './query.abstract'

export type QueryResponse<D = any, E extends Error = Error> = Promise<
  Result<D, E>
>

export abstract class IQueryHandler<Q extends IQuery = IQuery, D = any> {
  static readonly subscription: Constructor<IQuery>

  get subscription(): Constructor<IQuery> {
    return (this.constructor as typeof IQueryHandler).subscription
  }

  abstract handle<E extends Error = Error>(query: Q): QueryResponse<D, E>
}
