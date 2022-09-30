import 'reflect-metadata'
import { di } from '../constants'
import { AnyClassType } from '../interfaces/type.interface'

export function provider(opts?: { token: string }): ClassDecorator {
  return (target: object) => {
    const token = opts?.token
    const tokenAsString =
      !!token && token.length ? token : (target as AnyClassType).name
    Reflect.defineMetadata(di.INJECTABLE_TOKEN, tokenAsString, target)
    Reflect.defineMetadata(di.INJECTABLE, true, target)
  }
}
