import { InvalidPropError, Props } from '../props'

describe('Props', () => {
  it('should be defined', () => {
    expect(Props).toBeDefined()
  })

  type PropType = { foo: string }
  const props: PropType = { foo: 'bar' }
  const p = new Props(props)

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

  it('should be able to compare props', () => {
    const p1 = new Props({ foo: 'bar' })
    const p2 = new Props({ foo: 'baz' })
    expect(p.equals(p1)).toBeTruthy()
    expect(p.equals(p2)).toBeFalsy()
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
