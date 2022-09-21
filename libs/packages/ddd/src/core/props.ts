import { Serializable } from './types'
import v from '../utils/validator'
import { InvalidPropError } from './errors'
import { IResult, Result } from './result'

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
 * The constructor should be private, and the static factory method that ensures
 * validity should be used instead.
 * @see https://martinfowler.com/bliki/EvansClassification.html
 */
export abstract class Props<P extends IProps = IProps>
  implements Serializable<P>
{
  protected validator = v
  protected static validator = v

  protected constructor(public readonly props: P) {
    this.props = Object.freeze({ ...props })
  }

  /**
   * Getter for the props.
   * @returns the value of a given prop
   */
  get<K extends keyof P>(key: K): P[K] {
    return this.props[key]
  }

  /**
   * Abstract method to check if two props are equal.
   * @abstract
   * @returns true if the props are equal in value.
   */
  abstract equals(p: Props<P>): boolean

  /**
   * Check if the props are of the same class.
   * @returns true if the props are of the same class.
   */
  isSameClass(p: Props<P>): boolean {
    return this.constructor === p.constructor
  }

  /**
   * Check if the props are equal.
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
   * Returns a serialized version of the props.
   * @returns the serialized props as a plain JS object.
   */
  serialize(): P {
    return { ...this.props }
  }

  /**
   * @description Method to validate prop value.
   * @param props to validate
   */
  public static isValidProps(props: IProps): boolean {
    return !this.validator.void(props)
  }
}
