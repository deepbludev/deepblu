import 'reflect-metadata'
import { ioc } from '../../constants'
import { provider } from '../provider.decorator'

abstract class AbstractProvider {
  abstract someMethod(): void
}

@provider()
class Provider implements AbstractProvider {
  constructor(
    public foo: string,
    private readonly bar: number,
    protected baz: Date
  ) {}

  someMethod() {
    console.log()
  }
}

describe('@injectable', () => {
  describe('when called with no options', () => {
    it('set injectable watermark', () => {
      expect(Reflect.getMetadata(ioc.PROVIDER, Provider)).toBeTruthy()
    })
  })

  it('get param types', () => {
    const params = Reflect.getMetadata('design:paramtypes', Provider)
    expect(params[0]).toEqual(String)
    expect(params[0].name).toEqual('String')
    expect(params[1]).toEqual(Number)
    expect(params[1].name).toEqual('Number')
    expect(params[2]).toEqual(Date)
    expect(params[2].name).toEqual('Date')
  })
})
