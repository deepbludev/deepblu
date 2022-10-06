import { IIdentifiable } from './identifiable.interface'
import {
  IDomainObjectProps,
  DomainObject,
} from '../base/domain-object.abstract'
import { UniqueID } from '../uid/unique-id.vo'

/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
export interface IEntityProps extends IDomainObjectProps {}

/**
 * @class Entity
 * @classdesc Entity is a base class for all domain entities.
 * Entity is a domain object that has a unique identifier.
 * Entity is a root of an aggregate.
 * Entities are compared by their unique identifiers.
 * Entities contain business logic.
 * Entities are persisted.
 * Entities are mutable.
 * Entities are not value objects, data transfer objects or aggregates.
 *
 * @see https://martinfowler.com/bliki/EvansClassification.html
 */

export abstract class BaseEntity<
    P extends IEntityProps,
    I extends UniqueID = UniqueID
  >
  extends DomainObject<P>
  implements IIdentifiable<I>
{
  public readonly id: I

  protected constructor(props: P, id?: I) {
    super(props, 'Entity')
    this.id = id ?? (UniqueID.create() as I)
  }

  /**
   * @description Entities are compared by their id and class.
   * @returns true if the value objects are equal in value.
   */
  equals<E extends BaseEntity<P, I>>(entity: E): boolean {
    return this.isSameClass(entity) && this.id.equals(entity.id)
  }

  /**
   * @description Get an instance copy.
   * @returns a copy of the entity.
   */
  clone<E extends BaseEntity<P, I>>(): E {
    const constructor = Reflect.getPrototypeOf(this)?.constructor
    if (!constructor) throw new Error('Cannot clone entity')
    return Reflect.construct(constructor, [this.props, this.id.clone()])
  }

  get hashcode(): UniqueID {
    const constructor = Reflect.getPrototypeOf(this)?.constructor.name
    return UniqueID.from(
      `[${this.domainObjectType}@${constructor}]:${this.id.value}`
    ).data
  }
}
