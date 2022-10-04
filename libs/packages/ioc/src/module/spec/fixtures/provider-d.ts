import { singleton } from '../../../core'
import { ProviderA } from './provider-a'
import { AbstractProviderD } from './provider-d.abstract'

@singleton()
export class ProviderD implements AbstractProviderD {
  constructor(readonly providerA: ProviderA) {}

  bar(): string {
    return 'bar.d'
  }

  baz(): string {
    return 'baz'
  }
}
