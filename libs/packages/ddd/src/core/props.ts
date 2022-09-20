/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IProps {
  [index: string]: any
}

/**
 * @desc ValueObjects are immutable objects
 * Their equality is determined through their structural property and class.
 */
export abstract class Props<P extends IProps = IProps> {
  protected constructor(public readonly props: P) {
    this.props = Object.freeze({ ...this.props })
  }

  get<K extends keyof P>(key: K): P[K] {
    return this.props[key]
  }

  abstract equals(p: Props<P>): boolean

  isSameClass(p: Props<P>): boolean {
    if (this === p) return true
    if (p === null || p === undefined) return false
    return this.constructor === p.constructor
  }

  hasSameProps(p: Props<P>): boolean {
    return JSON.stringify(this.props) === JSON.stringify(p.props)
  }
}

export class InvalidPropError extends Error {
  constructor(public readonly prop: string, public readonly details: string) {
    super(`${prop}: ${details}`)
    this.name = InvalidPropError.name
  }
}
