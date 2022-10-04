/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { constructor, RegistrationOptions } from 'tsyringe/dist/typings/types'
import {
  InjectionToken,
  Provider,
  registry,
  Lifecycle,
  isClassProvider,
  singleton,
} from '../core'

export interface ModuleOptions {
  imports?: constructor<any>[]
  providers?: (constructor<any> | ProviderRegistration)[]
}

type ProviderRegistration = {
  token: InjectionToken
  options?: RegistrationOptions
} & Provider<any>

const isProviderRegistration = (
  provider: any
): provider is ProviderRegistration => !!provider.token

/**
 * @description Decorator for modules. Registers all providers in the module and imports submodules.
 * @param options object containing providers and submodules as arrays
 */

export function module(
  options: ModuleOptions = { providers: [] }
): ClassDecorator {
  return function (target: any) {
    return singleton()(
      registry(
        options.providers?.filter(isProviderRegistration).map(p => ({
          ...p,
          options:
            !p.options && isClassProvider(p)
              ? { lifecycle: Lifecycle.Singleton }
              : p.options,
        }))
      )(target)
    )
  }
}
