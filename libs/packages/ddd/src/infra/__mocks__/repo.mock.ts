import { IRepo } from '../../domain/repo/repo.abstract'
import { IUniqueID } from '../../domain/uid/unique-id.vo'
import { AggregateStub } from '../../domain/__mocks__/aggregate.stub'

export class AggregateRepoMock extends IRepo<AggregateStub> {
  readonly aggregates: Map<string, AggregateStub> = new Map()

  protected async persist(entity: AggregateStub): Promise<void> {
    this.aggregates.set(entity.id.value, entity)
  }

  async get(id: IUniqueID): Promise<AggregateStub | null> {
    return this.aggregates.get(id.value) ?? null
  }
}
