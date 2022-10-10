import { IEvent } from '../../domain'
import { MockAggregate } from '../../domain/__mocks__/mock.aggregate'
import { IEventStream } from '../persistence/event-store/event-stream.interface'

export class MockEventStream extends IEventStream {
  name = MockAggregate.name
  readonly events: IEvent[] = []
  protected version = 0

  async append(aggId: string, events: IEvent[], version: number) {
    this.events.push(...events)
    this.version = version
  }
}
