import { IDomainEvent } from '../../../domain'

export abstract class IEventStream<E extends IDomainEvent = IDomainEvent> {
  abstract readonly name: string
  abstract append(aggId: string, events: E[], version: number): Promise<void>
  abstract get(aggId: string): Promise<E[]>
}
