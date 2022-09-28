import 'reflect-metadata'
import { AnyClassType } from '@deepblu/ddd/core'
import { di } from '../constants'

export function injectable(opts?: { injectableType?: string }): ClassDecorator {
  return (target: object) => {
    const injectableType = opts?.injectableType
    Reflect.defineMetadata(
      di.INJECTABLE_TYPE,
      !!injectableType && injectableType.length
        ? injectableType
        : (target as AnyClassType).name,
      target
    )
  }
}
