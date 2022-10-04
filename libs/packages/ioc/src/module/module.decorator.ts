/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { constructor, RegistrationOptions } from 'tsyringe/dist/typings/types'
import {
  InjectionToken,
  Provider,
  registry,
  Lifecycle,
  isClassProvider,
} from '../core'

export interface ModuleOptions {
  providers?: (constructor<any> | ProviderRegistration)[]
}

type ProviderRegistration = {
  token: InjectionToken
  options?: RegistrationOptions
} & Provider<any>

const isProviderRegistration = (
  provider: any
): provider is ProviderRegistration => {
  return provider.token !== undefined
}

/**
 * @description Decorator for modules. Registers all providers in the module and imports submodules.
 * @param options
 * @returns
 */

export function module(
  options: ModuleOptions = { providers: [] }
): ClassDecorator {
  const registrations: ProviderRegistration[] =
    options.providers?.filter(isProviderRegistration).map(p => ({
      ...p,
      options:
        !p.options && isClassProvider(p)
          ? { lifecycle: Lifecycle.Singleton }
          : p.options,
    })) || []

  return (target: any) => {
    return registry(registrations)(target)
  }
}
