import { UniqueID, UniqueIDProps } from '../unique-id.abstract'

class MockUniqueID extends UniqueID {
  constructor(props: UniqueIDProps) {
    super(props)
  }
}

describe('UniqueID', () => {
  const id = new MockUniqueID({ value: 'asd', isNew: true })
  const id2 = new MockUniqueID({ value: 'asd', isNew: false })
  const id3 = new MockUniqueID({ value: 'qwe', isNew: true })

  it('should be defined', () => {
    expect(UniqueID).toBeDefined()
    expect(MockUniqueID).toBeDefined()
  })
  it('should be able to create a new instance', () => {
    expect(id.value).toEqual('asd')
  })

  it('should be able to compare UUIDs', () => {
    expect(id.equal(id2)).toEqual(true)
    expect(id.equal(id3)).toEqual(false)
  })

  it('should be able to clone UUIDs', () => {
    const clone = id.clone<MockUniqueID>()
    expect(clone.value).toEqual('asd')

    const clone2: MockUniqueID = id.clone()
    expect(clone2.value).toEqual('asd')
  })
})
