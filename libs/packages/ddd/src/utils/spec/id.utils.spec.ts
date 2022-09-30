import { idUtils } from '../id.utils'

describe('uid()', () => {
  it('should generate a default id', () => {
    const id = idUtils.uid()
    expect(id.length).toBe(21)
    expect(id).toMatch(/^[A-Za-z0-9_-]+$/)
  })

  it('should generate a default id with a custom length', () => {
    const id = idUtils.uid(10)
    expect(id.length).toBe(10)
    expect(id).toMatch(/^[A-Za-z0-9_-]+$/)
  })
})
