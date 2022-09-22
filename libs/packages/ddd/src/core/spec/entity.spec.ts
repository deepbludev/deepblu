import { Entity, EntityProps } from '../entity'
import { UUID } from '../uuid.vo'

interface PropType extends EntityProps {
  foo: string
  is: boolean
}
class TestEntity extends Entity<PropType> {
  constructor(props: PropType, id?: UUID) {
    super(props, id)
  }
}

class TestEntity2 extends Entity<PropType> {
  constructor(props: PropType, id?: UUID) {
    super(props, id)
  }
}

describe('Entity', () => {
  it('should be defined', () => {
    expect(Entity).toBeDefined()
  })

  const entity = new TestEntity({ foo: 'bar', is: true })

  it('should be able to create a new instance', () => {
    expect(entity).toBeDefined()
    expect(entity.props).toEqual({ foo: 'bar', is: true })
    expect(entity.id).toBeDefined()
  })

  it('should be a Entity domain object type', () => {
    expect(entity.domainObjectType).toEqual('Entity')
  })

  it('should be able to compare entities', () => {
    const entity1 = new TestEntity({ foo: 'bar', is: true })
    const entity2 = new TestEntity({ foo: 'baz', is: true })
    expect(entity.equals(entity1)).toBeFalsy()
    expect(entity.equals(entity2)).toBeFalsy()
    expect(entity.equals(entity)).toBeTruthy()
  })

  it('should be able to compare of different class', () => {
    const entity2 = new TestEntity2({ foo: 'bar', is: true }, entity.id)
    expect(entity.equals(entity2)).toBeFalsy()
  })

  it('should be able to clone entities', () => {
    const entity1 = entity.clone()
    expect(entity.equals(entity1)).toBeTruthy()
  })
})
