import { DomainEventClass } from '../domain-event.interface'

export function domainEvent(aggregateClass: string) {
  return function (target: DomainEventClass) {
    target.aggregate = aggregateClass
    return target
  }
}
