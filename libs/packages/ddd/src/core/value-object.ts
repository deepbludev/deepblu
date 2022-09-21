import { IProps, Props } from './props'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VOProps extends IProps {}

/**
 * @class ValueObject
 * @classdesc Value Objects are immutable objects that do not contain any state
 * besides their props.
 * They are only identified by their values, not by unique ids as entities do.
 * They are be immutable. Behaviors should not change the state of a value object,
 * but can rather create a new value object.
 * They have value semantics (equality defined by property values and class).
 * You can combine other value types that usually go together into a new value object type,
 * like address (city, street, country, postal code) or ...range, or ...type.
 * They can are used as entities props, encapsulating the validation logic.
 * The constructor should be private, and the static factory method that ensures
 * validity should be used instead.
 * @see https://martinfowler.com/bliki/EvansClassification.html
 * @see https://martinfowler.com/bliki/ValueObject.html
 */
export class ValueObject<P extends VOProps> extends Props<P> {
  protected constructor(props: P) {
    super(props, 'ValueObject')
  }

  /**
   * @description Value Objects are compared by their properties and class
   * @returns true if the value objects are equal in value.
   */
  equals<V extends ValueObject<P>>(vo: V): boolean {
    return this.isSameClass(vo) && this.hasEqualProps(vo)
  }

  /**
   * @description Get an instance copy.
   * @returns a copy of the value object.
   */
  clone<V extends ValueObject<P>>(): V {
    const constructor = Reflect.getPrototypeOf(this)?.constructor
    if (!constructor) throw new Error('Cannot clone value object')
    return Reflect.construct(constructor, [this.props])
  }
}
