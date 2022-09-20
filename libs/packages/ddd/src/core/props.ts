/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IProps {
  [index: string]: any
}

export class Props<P extends IProps = IProps> {
  constructor(public readonly props: P) {
    this.props = Object.freeze({ ...this.props })
  }

  get<K extends keyof P>(key: K): P[K] {
    return this.props[key]
  }

  equals(props: Props<P>): boolean {
    return JSON.stringify(this.props) === JSON.stringify(props.props)
  }
}

export class InvalidPropError extends Error {
  constructor(public readonly prop: string, public readonly details: string) {
    super(`${prop}: ${details}`)
    this.name = InvalidPropError.name
  }
}
