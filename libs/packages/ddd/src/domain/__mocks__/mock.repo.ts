import { IRepo } from '../repo/repo.abstract'
import { UniqueID } from '../uid/unique-id.vo'
import { MockAggregate } from './mock.aggregate'

export class MockAggregateRepo extends IRepo<MockAggregate> {
  readonly aggregates: Map<string, MockAggregate> = new Map()

  protected async persist(entity: MockAggregate): Promise<void> {
    this.aggregates.set(entity.id.value, entity)
  }

  async get(id: UniqueID): Promise<MockAggregate | null> {
    return this.aggregates.get(id.value) ?? null
  }
}
