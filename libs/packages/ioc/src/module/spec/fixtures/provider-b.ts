import { inject, singleton } from '../../../core'
import { ProviderA } from './provider-a'
import { IProviderC, Token } from './provider-c.interface'

@singleton()
export class ProviderB {
  constructor(
    public readonly providerA: ProviderA,
    @inject('ProviderA1') public providerA1: ProviderA,
    @inject('ProviderA2') public providerA2: ProviderA,
    @inject('ProviderA3') public providerA3: ProviderA,
    @inject(Token.IProviderC) public iproviderC: IProviderC
  ) {}
}
