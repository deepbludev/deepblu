import { InvalidPropError } from '../../core/errors'
import { UniqueID, UniqueIDProps } from '../../core/unique-id.vo'
import { uid } from '../uid.decorator'

@uid({
  generator: () => 'valid' + Date.now(),
  validator: (id: string) => id.startsWith('valid'),
})
class MockUniqueID extends UniqueID {
  constructor(props: UniqueIDProps) {
    super(props)
  }
}

describe('@uid', () => {
  it('should be defined', () => {
    expect(uid).toBeDefined()
  })
  it('should be able to create a new instance from a value', () => {
    const id = MockUniqueID.from('valid')
    expect(id.isOk).toBeTruthy()
    expect(id.data.value).toEqual('valid')
  })

  it('should be able to generate a new instance', () => {
    const id = MockUniqueID.create()
    expect(MockUniqueID.isValid(id.value)).toBeTruthy()
  })

  it('should fail with invalid value', () => {
    const id = MockUniqueID.from('invalid')
    expect(id.isFail).toBeTruthy()
    expect(id.error).toEqual(
      new InvalidPropError('id', 'invalid is not a valid MockUniqueID')
    )
  })
})
