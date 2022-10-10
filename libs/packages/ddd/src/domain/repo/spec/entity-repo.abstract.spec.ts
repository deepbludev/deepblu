import { Entity } from '../../entity/entity'
import { UniqueID } from '../../uid/unique-id.vo'
import { UUID } from '../../uid/uuid.vo'
import { IEntityRepo } from '../entity-repo.abstract'

class MockEntity extends Entity<{ foo: string }> {
  constructor(props: { foo: string }, id?: UUID) {
    super(props, id)
  }
}

class MockEntityRepo extends IEntityRepo<MockEntity> {
  readonly entities: Map<string, MockEntity> = new Map()

  protected async persist(entity: MockEntity): Promise<void> {
    this.entities.set(entity.id.value, entity)
  }

  async get(id: UniqueID): Promise<MockEntity | null> {
    return this.entities.get(id.value) ?? null
  }
}

describe('IEntityRepo', () => {
  let repo: MockEntityRepo
  let entity: MockEntity
  let otherEntity: MockEntity

  beforeEach(() => {
    repo = new MockEntityRepo()
    entity = new MockEntity({ foo: 'bar' })
    otherEntity = new MockEntity({ foo: 'baz' })
  })

  it('should be defined', () => {
    expect(IEntityRepo).toBeDefined()
    expect(MockEntityRepo).toBeDefined()
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
