import { UUID } from '../../uid/uuid.vo'
import { IEntity, IEntityProps } from '../entity.abstract'
import { unique } from '../utils/unique.decorator'

interface Props extends IEntityProps {
  foo: string
  is: boolean
}

@unique(UUID)
class TestEntity extends IEntity<UUID, Props> {
  constructor(props: Props, id?: UUID) {
    super(props, id)
  }
}

@unique(UUID)
class TestEntity2 extends IEntity<UUID, Props> {
  constructor(props: Props, id?: UUID) {
    super(props, id)
  }
}

describe(IEntity, () => {
  it('should be defined and have the correct class name', () => {
    expect(IEntity).toBeDefined()
    expect(TestEntity).toBeDefined()
  })

  it('should have the correct class name', () => {
    expect(TestEntity.name).toEqual('TestEntity')
  })

  const entity = new TestEntity({ foo: 'bar', is: true })

  it('should be able to create a new instance', () => {
    expect(entity).toBeDefined()
    expect(entity.props).toEqual({ foo: 'bar', is: true })
    expect(entity.id).toBeDefined()
  })

  it('should be a Entity domain object type', () => {
    expect(entity.domType).toEqual('Entity')
  })

  it('should be able to compare entities', () => {
    const entity1 = new TestEntity({ foo: 'bar', is: true })
    const entity2 = new TestEntity({ foo: 'baz', is: true })
    expect(entity.equals(entity1)).toBeFalsy()
    expect(entity.equals(entity2)).toBeFalsy()
    expect(entity.equals(entity)).toBeTruthy()
  })

  it('should fail when comparing entities of different classes', () => {
    const entity2 = new TestEntity2({ foo: 'bar', is: true }, entity.id)
    expect(entity.equals(entity2)).toBeFalsy()
  })

  it('should be able to clone entities', () => {
    const entity1 = entity.clone<TestEntity>()
    expect(entity.equals(entity1)).toBeTruthy()
  })

  it('should have a hashcode based on its id, class name and domain object type', () => {
    const expectedHashCode = `Entity@TestEntity|${entity.id.value}`
    expect(entity.hashcode).toEqual(expectedHashCode)
  })
})
