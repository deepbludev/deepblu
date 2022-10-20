import { EventBusMock, AggregateRepoMock } from '../../../infra/__mocks__'
import { AggregateStub } from '../../__mocks__'
import { IEventPublisherRepo } from '../event-publiser-repo.abstract'

describe(IEventPublisherRepo, () => {
  let repo: AggregateRepoMock
  let eventbus: EventBusMock
  let aggregage: AggregateStub
  let otherAggregate: AggregateStub

  beforeEach(() => {
    eventbus = new EventBusMock()
    repo = new AggregateRepoMock(eventbus)
    aggregage = AggregateStub.create({ foo: 'bar', is: true }).data
    otherAggregate = AggregateStub.create({ foo: 'baz', is: false }).data
  })

  it('should be defined', () => {
    expect(IEventPublisherRepo).toBeDefined()
    expect(AggregateRepoMock).toBeDefined()
  })

  it('should be able to save an entity', async () => {
    expect(repo.aggregates.size).toBe(0)
    await repo.save(aggregage)
    expect(repo.aggregates.size).toBe(1)
    await repo.save(aggregage)
    expect(repo.aggregates.size).toBe(1)
    await repo.save(otherAggregate)
    expect(repo.aggregates.size).toBe(2)
  })

  it('should be able to get an entity', async () => {
    await repo.save(aggregage)
    await repo.save(otherAggregate)
    let result = await repo.get(aggregage.id)
    expect(result?.equals(aggregage)).toBe(true)
    result = await repo.get(otherAggregate.id)
    expect(result?.equals(otherAggregate)).toBe(true)
  })

  it('should be able to check if an entity exists', async () => {
    expect(await repo.exists(aggregage.id)).toBe(false)
    await repo.save(aggregage)
    expect(await repo.exists(aggregage.id)).toBe(true)
    expect(await repo.exists(otherAggregate.id)).toBe(false)
  })

  it('should publish events', async () => {
    const spy = jest.spyOn(eventbus, 'publish')
    const events = aggregage.changes
    await repo.save(aggregage)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(events)
  })
})
