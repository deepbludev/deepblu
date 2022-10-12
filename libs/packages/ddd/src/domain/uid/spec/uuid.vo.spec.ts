import { uuid } from '../utils/id.utils'
import { UUID } from '../uuid.vo'

describe(UUID, () => {
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
  })

  it('should validate props', () => {
    expect(UUID.isValidProps({ value: uuid.create() })).toEqual(true)
    expect(UUID.isValidProps({ value: 'invalid-uuid' })).toEqual(false)
  })

  it('should be able to create a non-new UUID from valid string', () => {
    const id = UUID.create()
    const id2 = UUID.from(id.value).data
    expect(id2.value).toEqual(id.value)
  })

  it('should be fail to create an UUID from invalid string', () => {
    expect(UUID.from('invalid-uuid').isFail).toEqual(true)
  })

  it('should be able to clone UUIDs', () => {
    const id = UUID.create()
    const clone: UUID = id.clone()
    expect(clone.equals(id)).toBeTruthy()
  })

  it('should be able to compare UUIDs', () => {
    const id = UUID.create()
    const id2 = UUID.create()
    const id3 = UUID.from(id.value).data
    expect(id.equals(id2)).toBeFalsy()
    expect(id.equals(id)).toBeTruthy()
    expect(id.equals(id3)).toBeTruthy()
  })
})
