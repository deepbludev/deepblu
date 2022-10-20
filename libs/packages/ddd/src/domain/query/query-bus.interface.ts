import { IQuery } from './query.abstract'
import { QueryResponse } from './query-handler.interface'

export interface IQueryBus {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get<E extends Error, D = any>(command: IQuery): QueryResponse<D, E>
}
