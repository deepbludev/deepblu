import { Constructor } from '../../types'
import { DomainEventClass } from '../domain-event.interface'
import { IEventSubscriber } from '../event-subscriber.interface'

export const eventSubscriber = (...events: DomainEventClass[]) =>
  function <
    T extends Constructor<IEventSubscriber> & {
      subscriptions: DomainEventClass[]
    }
  >(EventHandlerClass: T) {
    EventHandlerClass.subscriptions = events
  }
