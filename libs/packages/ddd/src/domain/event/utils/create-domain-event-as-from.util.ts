import { UniqueID } from '../../uid/unique-id.vo'
import { DomainEvent } from '../domain-event'

export const createDomainEvent = <P = Record<string, never>>() => ({
  as: (event: string) => ({
    from: (aggregate: string) => {
      const DomainEventClass = class extends DomainEvent<P> {
        static override aggregate = aggregate
        constructor(payload: P, id: UniqueID) {
          super(payload, id)
        }
      }
      Reflect.defineProperty(DomainEventClass, 'name', { value: event })
      return DomainEventClass
    },
  }),
})
