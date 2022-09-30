import 'reflect-metadata'
import { ioc } from '../constants'
import { AnyClassType } from '../interfaces/type.interface'

export function provider(opts?: { token: string }): ClassDecorator {
  return (target: object) => {
    const token = opts?.token
    const tokenAsString =
      !!token && token.length ? token : (target as AnyClassType).name
    Reflect.defineMetadata(ioc.INJECTABLE_TOKEN, tokenAsString, target)
    Reflect.defineMetadata(ioc.INJECTABLE, true, target)
  }
}
