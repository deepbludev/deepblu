import { IEventPublisherRepo, IUniqueID } from '../../domain'
import { AggregateStub } from '../../domain/__mocks__'

export class AggregateRepoMock extends IEventPublisherRepo<AggregateStub> {
  readonly aggregates: Map<string, AggregateStub> = new Map()

  protected async persist(entity: AggregateStub): Promise<void> {
    this.aggregates.set(entity.id.value, entity)
  }

  async get(id: IUniqueID): Promise<AggregateStub | null> {
    return this.aggregates.get(id.value) ?? null
  }
}
