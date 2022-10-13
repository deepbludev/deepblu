import { IDomainEvent } from '../../../domain'

export abstract class IEventStream<E extends IDomainEvent = IDomainEvent> {
  static aggregate = 'Aggregate'

  abstract append(aggId: string, events: E[], version: number): Promise<void>
  abstract get(aggId: string): Promise<E[]>
  abstract version(aggId: string): Promise<number>

  get aggregateName(): string {
    return (this.constructor as typeof IEventStream).aggregate
  }

  get name(): string {
    return `${this.aggregateName}.eventstream`
  }
}
