import { ObjectID } from '../object-id.vo'

describe('ObjectID', () => {
  const validId = '62cc6052063ff8fbbb578397' // valid ObjectID taken from actual MongoDB document

  it('should be defined', () => {
    expect(ObjectID).toBeDefined()
  })

  it('should be able to validate a ObjectID', () => {
    expect(ObjectID.isValid(validId)).toEqual(true)
  })
  it('should be able to create a new instance', () => {
    const id = ObjectID.create()
    expect(id.value).toBeDefined()
  })

  it('should validate props', () => {
    expect(ObjectID.isValidProps({ value: validId })).toEqual(true)
    expect(ObjectID.isValidProps({ value: 'invalid-object-id' })).toEqual(false)
  })

  it('should be able to create a non-new ObjectID from valid string', () => {
    const id = ObjectID.create()
    const id2 = ObjectID.from(id.value).data
    expect(id2.value).toEqual(id.value)
  })

  it('should be fail to create an ObjectID from invalid string', () => {
    expect(ObjectID.from('invalid-objectid').isFail).toEqual(true)
  })

  it('should be able to clone ObjectIDs', () => {
    const id = ObjectID.create()
    const clone: ObjectID = id.clone()
    expect(clone.equals(id)).toBeTruthy()
  })
})
