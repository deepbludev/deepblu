import { ObjectID } from '../../value-objects/object-id.vo'
import { EntityWithObjectID } from '../entity-with-object-id'

interface Props {
  foo: string
  is: boolean
}

class TestEntity extends EntityWithObjectID<Props> {
  constructor(props: Props, id?: ObjectID) {
    super(props, id)
  }
}

describe('EntityWithObjectID', () => {
  it('should be defined', () => {
    expect(EntityWithObjectID).toBeDefined()
  })

  const entity = new TestEntity({ foo: 'bar', is: true })

  it('should be able to create a new instance', () => {
    expect(entity).toBeDefined()
    expect(entity.props).toEqual({ foo: 'bar', is: true })
    expect(entity.id).toBeDefined()
  })

  it('should have a valid objectid as id', () => {
    expect(entity.id).toBeInstanceOf(ObjectID)
    expect(entity.id.value.length).toBe(24)
    expect(ObjectID.isValid(entity.id.value)).toBeTruthy()
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

  it('should be able to clone entities', () => {
    const entity1 = entity.clone<TestEntity>()
    expect(entity.equals(entity1)).toBeTruthy()
  })
})
