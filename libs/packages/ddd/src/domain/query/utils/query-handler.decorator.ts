import { Constructor } from '../../types'
import { IQueryHandler } from '../query-handler.interface'
import { IQuery } from '../query.abstract'

export const queryHandler = (query: Constructor<IQuery>) =>
  function <
    T extends Constructor<IQueryHandler> & {
      subscription: Constructor<IQuery>
    }
  >(QueryHandlerClass: T) {
    QueryHandlerClass.subscription = query
  }
