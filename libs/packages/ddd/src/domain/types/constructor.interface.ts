/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Constructor<T = any, A extends any[] = any[]>
  extends Function {
  new (...args: A): T
}
