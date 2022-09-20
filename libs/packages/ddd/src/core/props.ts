import { Serializable } from './types'

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IProps {
  [index: string]: any
}

/**
 * @class Props
 * @abstract
 * @classdesc Props are the base class for all value objects and entities.
 * They are immutable objects that contain the state of the domain.
 * They are used to create value objects and entities.
 * @see https://martinfowler.com/bliki/EvansClassification.html
 */
export abstract class Props<P extends IProps = IProps>
  implements Serializable<P>
{
  protected constructor(public readonly props: P) {
    this.props = Object.freeze({ ...props })
  }

  /**
   * @description Getter for the props.
   * @returns the value of a given prop
   */
  get<K extends keyof P>(key: K): P[K] {
    return this.props[key]
  }

  /**
   * @description Abstract method to check if two props are equal.
   * @returns true if the props are equal in value.
   */
  abstract equals(p: Props<P>): boolean

  /**
   * @description Check if the props are of the same class.
   * @returns true if the props are of the same class.
   */
  isSameClass(p: Props<P>): boolean {
    return this.constructor === p.constructor
  }

  /**
   * @description Check if the props are equal.
   * @returns true if the props are equal in value.
   */
  hasEqualProps(p: Props<P>): boolean {
    if (Object.keys(this.props).length !== Object.keys(p.props).length)
      return false
    for (const key in this.props)
      if (this.props[key] !== p.props[key]) return false
    return true
  }

  /**
   * @description Returns a serialized version of the props.
   * @returns the serialized props as a plain JS object.
   */
  serialize(): P {
    return { ...this.props }
  }
}
