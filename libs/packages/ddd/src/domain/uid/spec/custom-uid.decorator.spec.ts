import 'reflect-metadata'
import { InvalidPropError } from '../../core/errors'
import { IUniqueID, UniqueIDProps } from '../unique-id.vo'
import { customUID } from '../utils/custom-uid.decorator'

@customUID({
  generator: () => 'valid' + Date.now(),
  validator: (id: string) => id.startsWith('valid'),
})
class MockUniqueID extends IUniqueID {
  constructor(props: UniqueIDProps, private readonly date: Date) {
    super(props)
  }
}

describe('@customUID', () => {
  it('should be defined', () => {
    expect(customUID).toBeDefined()
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

  it('should enhance component with "design:paramtypes" metadata', () => {
    const constructorParams = Reflect.getMetadata(
      'design:paramtypes',
      MockUniqueID
    )
    expect(constructorParams[1]).toEqual(Date)
    expect(constructorParams[1].name).toEqual('Date')
  })
})
