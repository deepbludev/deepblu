import 'reflect-metadata'
import { AnyClassType } from '@deepblu/ddd'
import { di } from '../constants'

export function injectable(opts?: { injectableType: string }): ClassDecorator {
  return (target: object) => {
    const injectableType = opts?.injectableType
    const label =
      !!injectableType && injectableType.length
        ? injectableType
        : (target as AnyClassType).name
    Reflect.defineMetadata(di.INJECTABLE_TYPE, label, target)
    Reflect.defineMetadata(di.INJECTABLE, true, target)
  }
}
