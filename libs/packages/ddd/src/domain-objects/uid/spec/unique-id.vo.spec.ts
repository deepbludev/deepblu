import { InvalidPropError } from '../../base/errors'
import { customUID } from '../custom-uid.decorator'
import { UniqueID, UniqueIDProps } from '../unique-id.vo'

@customUID({
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
    expect(id.isOk).toBeTruthy()
    expect(id.data.value).toEqual('valid')
  })

  it('should fail with invalid value', () => {
    expect(id4.isFail).toBeTruthy()
    expect(id4.error).toEqual(
      new InvalidPropError('id', 'invalid is not a valid MockUniqueID')
    )
  })

  it('should be able to compare UUIDs', () => {
    expect(id.data.equal(id2.data)).toEqual(true)
    expect(id.data.equal(id3.data)).toEqual(false)
  })

  it('should be able to clone UUIDs', () => {
    const clone = id.data.clone<MockUniqueID>()
    expect(clone.value).toEqual('valid')

    const clone2: MockUniqueID = id.data.clone()
    expect(clone2.value).toEqual('valid')
  })

  it('should be able to create a new instance from a value', () => {
    const newId = MockUniqueID.create()
    expect(MockUniqueID.isValid(newId.value)).toBeTruthy()
    expect(newId.value.length).toEqual(21 + 'valid'.length)
  })
})