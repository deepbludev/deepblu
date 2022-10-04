import { ProviderA } from './provider-a'

export abstract class AbstractProviderD {
  constructor(readonly providerA: ProviderA) {}
  bar() {
    return 'bar'
  }

  abstract baz(): string
}
