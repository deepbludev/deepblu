import { InvalidPropError, Props } from '../props'

describe('Props', () => {
  type PropType = { foo: string }

  class TestProps extends Props<PropType> {
    constructor(props: PropType) {
      super(props)
    }

    equals(p: Props<PropType>): boolean {
      return !!p
    }
  }

  const props: PropType = { foo: 'bar' }
  const p = new TestProps(props)
  const p1 = new TestProps({ foo: 'bar' })
  const p2 = new TestProps({ foo: 'baz' })
  const p3 = { props: { foo: 'baz' } }

  it('should be defined', () => {
    expect(Props).toBeDefined()
  })

  it('should be able to create a new instance', () => {
    expect(p).toBeDefined()
    expect(p.props).toEqual({ foo: 'bar' })
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
    expect(p.hasSameProps(p1)).toBeTruthy()
    expect(p.hasSameProps(p2)).toBeFalsy()
    expect(p.isSameClass(p3 as Props<PropType>)).toBeFalsy()
  })

  it('should serialize', () => {
    expect(p.serialize()).toEqual({ foo: 'bar' })
  })
})

describe('InvalidPropError', () => {
  it('should be defined', () => {
    expect(InvalidPropError).toBeDefined()
  })

  const e = new InvalidPropError('foo', 'bar')
  it('should be able to create a new instance', () => {
    expect(e).toBeDefined()
    expect(e.prop).toBe('foo')
    expect(e.details).toBe('bar')
    expect(e.message).toBe('foo: bar')
    expect(e.name).toBe('InvalidPropError')
  })
})
