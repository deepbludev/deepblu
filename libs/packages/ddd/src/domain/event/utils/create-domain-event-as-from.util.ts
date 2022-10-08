import { DomainEvent } from '../domain-event'

export const createDomainEvent = <P = Record<string, never>>() => ({
  as: (event: string) => ({
    from: (aggregate: string) => {
      const EventClass = class extends DomainEvent<P> {
        static override aggregate = aggregate
        constructor(id: string, payload: P) {
          super(id, payload)
        }
      }
      Reflect.defineProperty(EventClass, 'name', { value: event })
      return EventClass
    },
  }),
})
