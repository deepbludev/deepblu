import { InvalidPropError } from '../errors'
import { id, UniqueID, UniqueIDProps } from '../unique-id'

@id({
  generator: () => 'valid' + UniqueID.generate(),
  validator: (id: string) => id.startsWith('valid'),
})
class MockUniqueID extends UniqueID {
  constructor(props: UniqueIDProps) {
    super(props)
  }
}

describe('UniqueID', () => {
  const id = MockUniqueID.from('valid')
  const id2 = MockUniqueID.from('valid')
  const id3 = MockUniqueID.from('valid2')
  const id4 = MockUniqueID.from('invalid')

  it('should be defined', () => {
    expect(UniqueID).toBeDefined()
    expect(MockUniqueID).toBeDefined()
  })
  it('should be able to create a new instance from a value', () => {
    expect(id.value.value).toEqual('valid')
    expect(id.isOk).toBeTruthy()
  })

  it('should fail with invalid value', () => {
    expect(id4.isFail).toBeTruthy()
    expect(id4.error).toEqual(
      new InvalidPropError('id', 'invalid is not a valid MockUniqueID')
    )
  })

  it('should be able to compare UUIDs', () => {
    expect(id.value.equal(id2.value)).toEqual(true)
    expect(id.value.equal(id3.value)).toEqual(false)
  })

  it('should be able to clone UUIDs', () => {
    const clone = id.value.clone<MockUniqueID>()
    expect(clone.value).toEqual('valid')

    const clone2: MockUniqueID = id.value.clone()
    expect(clone2.value).toEqual('valid')
  })

  it('should be able to create a new instance from a value', () => {
    const newId = MockUniqueID.create()
    expect(MockUniqueID.isValid(newId.value)).toBeTruthy()
    expect(newId.value.length).toEqual(24 + 'valid'.length)
  })
})
