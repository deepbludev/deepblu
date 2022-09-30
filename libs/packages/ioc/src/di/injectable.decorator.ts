import 'reflect-metadata'
import { di } from '../constants'
import { AnyClassType } from '../interfaces/type.interface'

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
