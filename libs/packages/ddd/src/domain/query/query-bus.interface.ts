import { IQuery } from './query.abstract'
import { QueryResponse } from './query-handler.interface'

export abstract class IQueryBus {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract get<E extends Error, D = any>(command: IQuery): QueryResponse<D, E>
}
