import { idUtils } from './id.utils'

describe('uid()', () => {
  it('should generate a default id', () => {
    const id = idUtils.uid.create()
    expect(id.length).toBeGreaterThan(0)
    expect(typeof id === 'string').toBe(true)
  })

  it('should validate a default id', () => {
    const id = idUtils.uid.create()
    const invalid = ''

    expect(idUtils.uid.isValid(id)).toBe(true)
    expect(idUtils.uid.isValid(invalid)).toBe(false)
  })
})
