import { inject, singleton } from '../../../core'
import { ImportedProvider } from './imported-provider'
import { ProviderA } from './provider-a'
import { IProviderC, Token } from './provider-c.interface'
import { AbstractProviderD } from './provider-d.abstract'

@singleton()
export class ProviderB {
  constructor(
    public readonly providerA: ProviderA,
    @inject('ProviderA1') public providerA1: ProviderA,
    @inject('ProviderA2') public providerA2: ProviderA,
    @inject('ProviderA3') public providerA3: ProviderA,
    @inject(Token.IProviderC) public iproviderC: IProviderC,
    @inject(AbstractProviderD.name) public providerD: AbstractProviderD,
    @inject(ImportedProvider.name) public importedProvider: ImportedProvider
  ) {}
}
