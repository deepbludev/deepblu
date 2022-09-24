import { UUID } from '../uuid.vo'
import { IEntityProps } from '../base-entity.abstract'
import { Entity } from '../entity'
import { Result } from '../result'
import { InvalidPropError } from '../errors'

interface Props extends IEntityProps {
  foo: string
  is: boolean
}

class TestEntity extends Entity<Props> {
  constructor(props: Props, id?: UUID) {
    super(props, id)
  }

  static create(props: Props, id?: UUID): Result<TestEntity> {
    return !this.isValidProps(props)
      ? Result.fail(
          new InvalidPropError('props', 'Invalid props' + props.toString())
        )
      : Result.ok(new TestEntity(props, id))
  }
}

class TestEntity2 extends Entity<Props> {
  constructor(props: Props, id?: UUID) {
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

  it('should be able to create a new instance with create method', () => {
    const result = TestEntity.create({ foo: 'bar', is: true })
    expect(result.isOk).toBeTruthy()
    expect(result.value.props).toEqual({ foo: 'bar', is: true })
    expect(result.value.id).toBeDefined()
  })
})
