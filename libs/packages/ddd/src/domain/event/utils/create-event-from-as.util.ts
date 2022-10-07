import { Constructor } from '../../../types'
import { DomainEvent } from './../domain-event'

export const createEvent = () => ({
  as: <P>(event: string) => ({
    from: (aggregate: string): Constructor<DomainEvent> => {
      const EventClass = class extends DomainEvent {
        static override aggregate = aggregate
        constructor(id: string, public readonly payload: P) {
          super(id)
        }
      }
      Reflect.defineProperty(EventClass, 'name', { value: event })
      return EventClass
    },
  }),
})
