/* eslint-disable @typescript-eslint/no-unused-vars */
import { MockAggregate } from '../../aggregate-root/spec/__mocks__/mock.aggregate'
import { IEvent } from '../../event/event.interface'
import { IEventBus } from '../../event/eventbus.interface'
import { UniqueID } from '../../uid/unique-id.vo'
import { UUID } from '../../uid/uuid.vo'
import { IRepo } from '../repo.abstract'

class MockEventBus implements IEventBus {
  async publish(events: IEvent[]) {
    return Promise.resolve()
  }
}

class MockAggregateRepo extends IRepo<MockAggregate> {
  readonly aggregates: Map<string, MockAggregate> = new Map()

  protected async persist(entity: MockAggregate): Promise<void> {
    this.aggregates.set(entity.id.value, entity)
  }

  async get(id: UniqueID): Promise<MockAggregate | null> {
    return this.aggregates.get(id.value) ?? null
  }
}

describe('IEntityRepo', () => {
  let repo: MockAggregateRepo
  let eventbus: MockEventBus
  let aggregage: MockAggregate
  let otherAggregate: MockAggregate

  beforeEach(() => {
    eventbus = new MockEventBus()
    repo = new MockAggregateRepo(eventbus)
    aggregage = MockAggregate.create({ foo: 'bar', is: true }).data
    otherAggregate = MockAggregate.create({ foo: 'baz', is: false }).data
  })

  it('should be defined', () => {
    expect(IRepo).toBeDefined()
    expect(MockAggregateRepo).toBeDefined()
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
