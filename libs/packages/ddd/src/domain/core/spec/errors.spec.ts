import { InvalidPropError } from '../errors'

describe(InvalidPropError, () => {
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
