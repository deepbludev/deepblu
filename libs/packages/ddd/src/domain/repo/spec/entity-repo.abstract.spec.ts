import { Entity } from '../../entity/entity'
import { IUniqueID } from '../../uid/unique-id.vo'
import { UUID } from '../../uid/uuid.vo'
import { IEntityRepo } from '../entity-repo.abstract'

class EntityStub extends Entity<{ foo: string }> {
  constructor(props: { foo: string }, id?: UUID) {
    super(props, id)
  }
}

class EntityRepoMock extends IEntityRepo<EntityStub> {
  readonly entities: Map<string, EntityStub> = new Map()

  protected async persist(entity: EntityStub): Promise<void> {
    this.entities.set(entity.id.value, entity)
  }

  async get(id: IUniqueID): Promise<EntityStub | null> {
    return this.entities.get(id.value) ?? null
  }
}

describe(IEntityRepo, () => {
  let repo: EntityRepoMock
  let entity: EntityStub
  let otherEntity: EntityStub

  beforeEach(() => {
    repo = new EntityRepoMock()
    entity = new EntityStub({ foo: 'bar' })
    otherEntity = new EntityStub({ foo: 'baz' })
  })

  it('should be defined', () => {
    expect(IEntityRepo).toBeDefined()
    expect(EntityRepoMock).toBeDefined()
  })

  it('should be able to save an entity', async () => {
    expect(repo.entities.size).toBe(0)
    await repo.save(entity)
    expect(repo.entities.size).toBe(1)
    await repo.save(entity)
    expect(repo.entities.size).toBe(1)
    await repo.save(otherEntity)
    expect(repo.entities.size).toBe(2)
  })

  it('should be able to get an entity', async () => {
    await repo.save(entity)
    await repo.save(otherEntity)
    let result = await repo.get(entity.id)
    expect(result?.equals(entity)).toBe(true)
    result = await repo.get(otherEntity.id)
    expect(result?.equals(otherEntity)).toBe(true)
  })

  it('should be able to check if an entity exists', async () => {
    expect(await repo.exists(entity.id)).toBe(false)
    await repo.save(entity)
    expect(await repo.exists(entity.id)).toBe(true)
    expect(await repo.exists(otherEntity.id)).toBe(false)
  })
})
