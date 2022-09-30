import 'reflect-metadata'
import { ioc } from '../constants'

export function provider(): ClassDecorator {
  return (target: object) => {
    Reflect.defineMetadata(ioc.PROVIDER, true, target)
  }
}
