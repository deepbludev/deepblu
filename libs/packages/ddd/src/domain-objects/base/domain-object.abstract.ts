import { DomainObjectType } from './domain-object.type'
import v from '../../utils/validator'

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IDomainObjectProps {
  [index: string]: any
}

/**
 * @class DomainObject
 * @abstract
 * @classdesc Props are the base class for all value objects and entities.
 * They are immutable objects that contain the state of the domain.
 * They are used to create value objects and entities.
 * The constructor should be private, and the static factory method that ensures
 * validity should be used instead.
 * @see https://martinfowler.com/bliki/EvansClassification.html
 */
export abstract class DomainObject<P extends IDomainObjectProps> {
  public readonly domainObjectType: DomainObjectType = 'DomainObject'
  protected static readonly validator = v
  public readonly validator = DomainObject.validator

  protected constructor(public readonly props: P) {
    this.props = Object.freeze({ ...props })
  }

  /**
   * Abstract method to check if two props are equal.
   * @abstract
   * @returns true if the props are equal in value.
   */
  abstract equals(p: DomainObject<P>): boolean

  /**
   * Check if the props are of the same class.
   * @returns true if the props are of the same class.
   */
  isSameClass(p: DomainObject<P>): boolean {
    return this.constructor === p.constructor
  }

  /**
   * Check if the props are equal.
   * @returns true if the props are equal in value.
   */
  hasEqualProps(p: DomainObject<P>): boolean {
    if (Object.keys(this.props).length !== Object.keys(p.props).length)
      return false
    for (const key in this.props)
      if (this.props[key] !== p.props[key]) return false
    return true
  }

  /**
   * @description Method to validate prop value.
   * @param props to validate
   */
  public static isValidProps(props: IDomainObjectProps): boolean {
    return !this.validator.void(props)
  }
}
