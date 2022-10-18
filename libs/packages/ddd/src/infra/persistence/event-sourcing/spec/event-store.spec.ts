import { IDomainEvent, UUID } from '../../../../domain'
import { AggregateStub } from '../../../../domain/__mocks__'
import {
  EventBusMock,
  EventStoreMock,
  EventStreamMock,
} from '../../../__mocks__'
import { ConcurrencyError } from '../errors/event-sourcing.errors'
import { EventStore } from '../event-store'

describe(EventStore, () => {
  let eventstream: EventStreamMock
  let eventbus: EventBusMock
  let eventstore: EventStoreMock
  let aggregate: AggregateStub
  let changes: IDomainEvent[]

  let appendSpy: jest.SpyInstance
  let publishSpy: jest.SpyInstance

  beforeAll(async () => {
    eventstream = new EventStreamMock()
    eventbus = new EventBusMock()
    eventstore = new EventStoreMock(eventstream, eventbus)
    aggregate = AggregateStub.create({ foo: 'bar', is: true }).data
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
    expect(eventstore.name).toEqual(AggregateStub.name)
  })

  it('should delegate persistence to the event stream', () => {
    expect(appendSpy).toHaveBeenCalledTimes(1)
    expect(appendSpy).toHaveBeenCalledWith(
      aggregate.id.value,
      changes,
      4 //aggregate.version
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

  it('should throw a ConcurrencyError when trying to save an aggregate with a version that differs from the current stream version', async () => {
    const original = await eventstore.get(aggregate.id)
    const fetched = await eventstore.get(aggregate.id)

    if (fetched && original) {
      fetched.updateProps({ foo: 'qux' })
      fetched.toggle()
      expect(fetched?.version).toEqual(4)
      expect(fetched.changes.length).toEqual(2)
      expect(await eventstore.version(aggregate.id)).toBe(4)

      await eventstore.save(fetched)
      expect(await eventstore.version(aggregate.id)).toBe(6)

      expect(async () => {
        await eventstore.save(original)
      }).rejects.toThrowError(ConcurrencyError.with(original, 6))

      expect(async () => {
        await eventstore.save(original, 6)
      }).not.toThrowError()

      expect(async () => {
        await eventstore.save(original, 4)
      }).rejects.toThrowError(ConcurrencyError.with(original, 6))
    }

    const refetched = await eventstore.get(aggregate.id)
    if (refetched) {
      expect(refetched.version).toEqual(6)
      expect(refetched.props.foo).toEqual('qux')
      expect(refetched.changes.length).toBe(0)

      const snapshot: AggregateStub = refetched.snapshot(15)
      expect(async () => {
        await eventstore.save(snapshot)
      }).rejects.toThrowError(ConcurrencyError)
      expect(await eventstore.version(aggregate.id)).toBe(6)
    }
  })
})
