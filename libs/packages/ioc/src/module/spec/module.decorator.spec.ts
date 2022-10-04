import { container } from '../../core'
import {
  IProviderC,
  Token,
  ProviderA,
  ProviderB,
  ProviderC,
  AbstractProviderD,
  ProviderD,
} from './fixtures'
import { module } from '../module.decorator'

const providerAValue = new ProviderA()
@module({
  providers: [
    ProviderA,
    ProviderB,
    { token: 'ProviderA1', useClass: ProviderA },
    { token: 'ProviderA2', useFactory: () => new ProviderA() },
    { token: 'ProviderA3', useValue: providerAValue },
    { token: Token.IProviderC, useClass: ProviderC },
    { token: AbstractProviderD.name, useClass: ProviderD },
  ],
})
export class SomeModule {}

@module()
class SomeOtherModule {
  constructor(public providerB: ProviderB) {}
}

describe('@module decorator', () => {
  const providerA = container.resolve(ProviderA)
  const providerA1 = container.resolve<ProviderA>('ProviderA1')
  const providerA2 = container.resolve<ProviderA>('ProviderA2')
  const providerA3 = container.resolve<ProviderA>('ProviderA3')
  const providerB = container.resolve(ProviderB)
  const iproviderC = container.resolve<IProviderC>(Token.IProviderC)
  const aproviderD = container.resolve<AbstractProviderD>(
    AbstractProviderD.name
  )

  it('register a list of providers to the global container', () => {
    expect(providerA).toBeInstanceOf(ProviderA)
    expect(providerA1).toBeInstanceOf(ProviderA)
    expect(providerA2).toBeInstanceOf(ProviderA)
    expect(providerA3).toBeInstanceOf(ProviderA)
    expect(iproviderC).toBeInstanceOf(ProviderC)
    expect(aproviderD).toBeInstanceOf(ProviderD)

    expect(providerB).toBe(providerB)
    expect(providerB.providerA).toBe(providerA)
    expect(providerB.providerA1).toBe(providerA1)
    expect(providerB.providerA2).toBeInstanceOf(ProviderA)
    expect(providerB.providerA3).toBe(providerA3)
    expect(providerB.iproviderC).toBe(iproviderC)
    expect(providerB.providerD).toBe(aproviderD)

    expect(aproviderD.providerA).toBe(providerA)
  })

  it('it registers the module as singleton', () => {
    const module1 = container.resolve(SomeModule)
    const module2 = container.resolve(SomeModule)

    expect(module1).toBe(module2)
  })

  it('works with no providers', () => {
    const someOtherModule = container.resolve(SomeOtherModule)

    expect(() => container.resolve(SomeOtherModule)).not.toThrow()
    expect(someOtherModule.providerB).toBe(providerB)
  })
})
