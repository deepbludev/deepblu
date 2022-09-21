import { Props } from '../props.abstract'

describe('Props', () => {
  type PropType = { foo: string; bar: string }

  class TestProps extends Props<PropType> {
    constructor(props: PropType) {
      super(props, 'Entity')
    }

    equals(p: Props<PropType>): boolean {
      return !!p
    }
  }

  const props: PropType = { foo: 'bar', bar: 'baz' }
  const p = new TestProps(props)
  const p1 = new TestProps({ foo: 'bar', bar: 'baz' })
  const p2 = new TestProps({ foo: 'foo', bar: 'baz' })
  const p3 = { props: { foo: 'baz' } }
  const p4 = new TestProps({ bar: 'baz', foo: 'bar' })

  it('should be defined', () => {
    expect(Props).toBeDefined()
  })

  it('should know what type of domain object it is', () => {
    expect(p.domainObjectType).toEqual('Entity')
  })

  it('should be able to create a new instance', () => {
    expect(p).toBeDefined()
    expect(p.props).toEqual({ foo: 'bar', bar: 'baz' })
  })

  it('should be able to get a prop', () => {
    expect(p.props.foo).toBe('bar')
    expect(p.get('foo')).toBe('bar')
  })

  it('should not be able to set a prop', () => {
    const set = () => (p.props.foo = 'baz')
    expect(set).toThrow()
  })

  it('should be able to compare props type', () => {
    expect(p.isSameClass(p1)).toBeTruthy()
    expect(p.isSameClass(p2)).toBeTruthy()
    expect(p.isSameClass(p3 as Props<PropType>)).toBeFalsy()
  })

  it('should be able to compare props', () => {
    expect(p.hasEqualProps(p1)).toBeTruthy()
    expect(p.hasEqualProps(p2)).toBeFalsy()
    expect(p.isSameClass(p3 as Props<PropType>)).toBeFalsy()
    expect(p.hasEqualProps(p4)).toBeTruthy()
  })

  it('should serialize', () => {
    expect(p.serialize()).toEqual({ foo: 'bar', bar: 'baz' })
  })

  it('should be able to validate props', () => {
    expect(TestProps.isValidProps({ foo: 'bar', bar: 'baz' })).toBeTruthy()
    expect(TestProps.isValidProps(null as unknown as PropType)).toBeFalsy()
    expect(TestProps.isValidProps(undefined as unknown as PropType)).toBeFalsy()
  })
})
