/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Constructor<T = any> extends Function {
  new (...args: any[]): T
}
