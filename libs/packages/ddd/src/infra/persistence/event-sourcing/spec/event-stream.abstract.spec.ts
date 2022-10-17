import { IDomainEvent } from '../../../../domain'
import { AggregateStub } from '../../../../domain/__mocks__'
import { EventStreamMock } from '../../../__mocks__'
import { IEventStream } from '../event-stream.interface'

describe(IEventStream, () => {
  let stream: EventStreamMock
  let aggregate: AggregateStub
  let events: IDomainEvent[]
  let aggId: string
  let version: number
  let otherAggregate: AggregateStub
  let otherAggId: string
  let otherEvents: IDomainEvent[]
  let otherVersion: number

  beforeEach(async () => {
    stream = new EventStreamMock()
    aggregate = AggregateStub.create({ foo: 'bar', is: true }).data
    aggregate.toggle()
    aggregate.updateProps({ foo: 'baz' })

    aggId = aggregate.id.value
    events = [...aggregate.changes]
    version = aggregate.version

    otherAggregate = AggregateStub.create({ foo: 'bar', is: true }).data
    otherAggregate.toggle()
    otherAggregate.toggle()

    otherAggId = otherAggregate.id.value
    otherEvents = [...otherAggregate.changes]
    otherVersion = otherAggregate.version

    await stream.append(aggId, events, version)
    await stream.append(otherAggId, otherEvents, otherVersion)
  })

  it('should be defined', () => {
    expect(IEventStream).toBeDefined()
  })

  it('should have a aggregate name', () => {
    expect(stream.aggregateName).toEqual('AggregateStub')
  })

  it('should have a stream name', () => {
    expect(stream.name).toEqual('AggregateStub.eventstream')
  })

  it('should be able to append events to multiple aggregates', async () => {
    const fetched = await stream.get(aggId)
    const otherFetched = await stream.get(otherAggId)

    expect(fetched).toEqual(events)
    expect(otherFetched).toEqual(otherEvents)
  })

  it("should keep track of the aggregate's current version", async () => {
    const fetchedVersion = await stream.version(aggId)
    const otherFetchedVersion = await stream.version(otherAggId)

    expect(fetchedVersion).toEqual(version)
    expect(otherFetchedVersion).toEqual(otherVersion)
  })
})
