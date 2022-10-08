import { DomainEvent } from '../domain-event'

export const createDomainEvent = <P = Record<string, never>>() => ({
  as: (event: string) => ({
    from: (aggregate: string) => {
      const DomainEventClass = class extends DomainEvent<P> {
        static override aggregate = aggregate
        constructor(id: string, payload: P) {
          super(id, payload)
        }
      }
      Reflect.defineProperty(DomainEventClass, 'name', { value: event })
      return DomainEventClass
    },
  }),
})
