import { IProps, Props } from './props'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface VOProps extends IProps {}

/**
 * @class ValueObject
 * @abstract
 * @classdesc ValueObjects are immutable objects that do not contain any state
 * besides their props. They can be mapped 1-to-1 to the props given to create it,
 * i.e. two ValueObjects are equal if their props are equal and they are of the same class.
 * @see https://martinfowler.com/bliki/EvansClassification.html
 */
export abstract class ValueObject<P extends VOProps> extends Props<P> {
  protected constructor(props: P) {
    super(props)
  }

  /**
   * @description ValueObjects are compared by their properties and class
   * @returns true if the value objects are equal in value.
   */
  equals<V extends ValueObject<P>>(vo: V): boolean {
    return this.isSameClass(vo) && this.hasSameProps(vo)
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
