import { DomainObject } from '../domain-object.abstract'

describe(DomainObject, () => {
  type DummyProps = { foo: string; bar: string }

  class TestDO extends DomainObject<DummyProps> {
    constructor(props: DummyProps) {
      super(props)
    }

    equals(p: DomainObject<DummyProps>): boolean {
      return !!p
    }
  }

  const props: DummyProps = { foo: 'bar', bar: 'baz' }
  const p = new TestDO(props)
  const p1 = new TestDO({ foo: 'bar', bar: 'baz' })
  const p2 = new TestDO({ foo: 'foo', bar: 'baz' })
  const p3 = { props: { foo: 'baz' } }
  const p4 = new TestDO({ bar: 'baz', foo: 'bar' })

  it('should be defined', () => {
    expect(DomainObject).toBeDefined()
  })

  it('should know what type of domain object it is', () => {
    expect(p.domType).toEqual('DomainObject')
  })

  it('should be able to create a new instance', () => {
    expect(p).toBeDefined()
    expect(p.props).toEqual({ foo: 'bar', bar: 'baz' })
  })

  it('should be able to get a prop', () => {
    expect(p.props.foo).toBe('bar')
  })

  it('should be able to compare props type', () => {
    expect(p.isSameClass(p1)).toBeTruthy()
    expect(p.isSameClass(p2)).toBeTruthy()
    expect(p.isSameClass(p3 as DomainObject<DummyProps>)).toBeFalsy()
  })

  it('should be able to compare props', () => {
    expect(p.hasEqualProps(p1)).toBeTruthy()
    expect(p.hasEqualProps(p2)).toBeFalsy()
    expect(p.isSameClass(p3 as DomainObject<DummyProps>)).toBeFalsy()
    expect(p.hasEqualProps(p4)).toBeTruthy()
  })

  it('should be able to validate props', () => {
    expect(TestDO.isValidProps({ foo: 'bar', bar: 'baz' })).toBeTruthy()
    expect(TestDO.isValidProps(null as unknown as DummyProps)).toBeFalsy()
    expect(TestDO.isValidProps(undefined as unknown as DummyProps)).toBeFalsy()
  })
})
