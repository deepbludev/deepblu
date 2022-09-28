import 'reflect-metadata'
import { di } from '../../constants'
import { injectable } from '../injectable.decorator'

abstract class AbstractInjectable {
  abstract someMethod(): void
}

@injectable()
class Injectable implements AbstractInjectable {
  constructor(
    public foo: string,
    private readonly bar: number,
    protected baz: Date
  ) {}

  someMethod() {
    console.log()
  }
}

@injectable({ injectableType: 'SomeService' })
class SomeServiceImpl {}

describe('@injectable', () => {
  describe('when called with no options', () => {
    it('set injectable watermark', () => {
      expect(Reflect.getMetadata(di.INJECTABLE, Injectable)).toBeTruthy()
      expect(Reflect.getMetadata(di.INJECTABLE_TYPE, Injectable)).toEqual(
        'Injectable'
      )
      expect(Reflect.getMetadata(di.INJECTABLE_TYPE, Injectable)).toEqual(
        Injectable.name
      )
    })
  })

  describe('when called with options', () => {
    it('set injectable watermark', () => {
      expect(Reflect.getMetadata(di.INJECTABLE_TYPE, SomeServiceImpl)).toEqual(
        'SomeService'
      )
    })
  })

  it('get param types', () => {
    const params = Reflect.getMetadata('design:paramtypes', Injectable)
    expect(params[0]).toEqual(String)
    expect(params[0].name).toEqual('String')
    expect(params[1]).toEqual(Number)
    expect(params[1].name).toEqual('Number')
    expect(params[2]).toEqual(Date)
    expect(params[2].name).toEqual('Date')
  })
})
