import { uuid } from '../../utils/uuid.utils'
import { UUID } from '../uuid.vo'

describe('UUID', () => {
  it('should be defined', () => {
    expect(UUID).toBeDefined()
  })

  it('should be able to validate a UUID', () => {
    const id = uuid.create()
    expect(UUID.isValid(id)).toEqual(true)
  })
  it('should be able to create a new instance', () => {
    const id = UUID.create()
    expect(id.value).toBeDefined()
    expect(id.isNew).toEqual(true)
  })

  it('should be able to create a non-new UUID from valid string', () => {
    const id = UUID.create()
    const id2 = UUID.from(id.value).value
    expect(id2.value).toEqual(id.value)
    expect(id2.isNew).toEqual(false)
  })

  it('should be fail to create an UUID from invalid string', () => {
    expect(UUID.from('invalid-uuid').isFail).toEqual(true)
  })

  it('should be able to clone UUIDs', () => {
    const id = UUID.create()
    const clone: UUID = id.clone()
    expect(clone.equal(id)).toBeTruthy()
  })
})
