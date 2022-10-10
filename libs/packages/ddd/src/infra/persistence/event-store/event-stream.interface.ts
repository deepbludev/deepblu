import { IEvent } from '../../../domain'

export abstract class IEventStream<E extends IEvent = IEvent> {
  abstract readonly name: string
  abstract append(aggId: string, events: E[], version: number): Promise<void>
  abstract get(aggId: string): Promise<E[]>
}
