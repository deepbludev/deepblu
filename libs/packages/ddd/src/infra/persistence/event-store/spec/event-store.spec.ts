import { MockAggregate } from '../../../../domain/__mocks__/mock.aggregate'
import { MockEventBus } from '../../../__mocks__/mock.event-bus'
import { MockEventStore } from '../../../__mocks__/mock.event-store'
import { MockEventStream } from '../../../__mocks__/mock.event-stream'
import { IEvent, UUID } from '../../../../domain'
import { EventStore } from '../event-store'

describe(EventStore, () => {
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
    aggregate.toggle()
    aggregate.updateProps({ foo: 'baz' })
    aggregate.toggle()
    aggregate.toggle()

    changes = [...aggregate.changes]

    appendSpy = jest.spyOn(eventstream, 'append')
    publishSpy = jest.spyOn(eventbus, 'publish')

    await eventstore.save(aggregate)
  })

  it('should have a name', () => {
    expect(eventstore.name).toEqual(MockAggregate.name)
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

  it('should be able to get an aggregate', async () => {
    const result = await eventstore.get(aggregate.id)
    expect(result?.equals(aggregate)).toBe(true)
    expect(result?.version).toEqual(4)
  })

  it('should return null when trying to get an aggregate that does not exist', async () => {
    const nullResult = await eventstore.get(UUID.create())
    expect(nullResult).toBeNull()
  })

  it('should be able to check if an aggregate exists', async () => {
    expect(await eventstore.exists(aggregate.id)).toBe(true)
    expect(await eventstore.exists(UUID.create())).toBe(false)
  })
})
