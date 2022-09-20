import { IProps, Props } from './props'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface VOProps extends IProps {}

/**
 * @desc ValueObjects are immutable objects
 * Their equality is determined through their structural property.
 */
export abstract class ValueObject<P extends VOProps> extends Props<P> {
  protected constructor(props: P) {
    super(props)
  }

  /**
   * @description ValueObjects are compared by their properties and class
   * @returns
   */
  equals<V extends ValueObject<P>>(vo: V): boolean {
    return this.isSameClass(vo) && this.hasSameProps(vo)
  }

  /**
   * @description Get an instance copy.
   * @returns a new instance of value object.
   */
  clone<V extends ValueObject<P>>(): V {
    const constructor = Reflect.getPrototypeOf(this)?.constructor
    if (!constructor) throw new Error('Cannot clone value object')
    return Reflect.construct(constructor, [this.props])
  }
}
