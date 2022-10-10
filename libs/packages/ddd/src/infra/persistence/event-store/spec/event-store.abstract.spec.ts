/* eslint-disable @typescript-eslint/no-unused-vars */
import { MockAggregate } from '../../../../domain/__mocks__/mock.aggregate'
import { MockEventBus } from '../../../../domain/__mocks__/mock.event-bus'
import { MockEventStore } from '../../../__mocks__/mock.event-store'
import { MockEventStream } from '../../../__mocks__/mock.event-stream'
import { IEvent } from '../../../../domain'
import { IEventStore } from '../event-store.abstract'

describe(IEventStore, () => {
  let eventstream: MockEventStream
  let eventbus: MockEventBus
  let eventstore: MockEventStore
  let aggregate: MockAggregate
  let changes: IEvent[]

  let appendSpy: jest.SpyInstance
  let publishSpy: jest.SpyInstance

  beforeAll(async () => {
    eventstream = new MockEventStream()
    eventbus = new MockEventBus()
    eventstore = new MockEventStore(eventstream, eventbus)
    aggregate = MockAggregate.create({ foo: 'bar', is: true }).data
    changes = [...aggregate.changes]

    appendSpy = jest.spyOn(eventstream, 'append')
    publishSpy = jest.spyOn(eventbus, 'publish')

    await eventstore.save(aggregate)
  })

  it('should delegate persistence to the event stream', () => {
    expect(appendSpy).toHaveBeenCalledTimes(1)
    expect(appendSpy).toHaveBeenCalledWith(
      aggregate.id.value,
      changes,
      aggregate.version
    )
  })

  it('should publish events', () => {
    expect(publishSpy).toHaveBeenCalledTimes(1)
    expect(publishSpy).toHaveBeenCalledWith(changes)
  })
})
