import { IIdentifiable } from '../../types/identifiable.interface'
import {
  IDomainObjectProps,
  DomainObject,
} from '../core/domain-object.abstract'
import { UniqueID } from '../uid/unique-id.vo'
import { DomainObjectType } from '../core/domain-object.type'

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
  public override readonly domainObjectType: DomainObjectType = 'Entity'
  public id: I

  protected constructor(props: P, id?: I) {
    super(props)
    this.id = id ?? (UniqueID.create() as I)
  }

  /**
   * @description Entities are compared by their id and class.
   * Subclasses should override this method if they have additional properties.
   * @param other - the other entity to compare.
   * @returns true if the entities are equal in props and id.
   */
  equals(other: BaseEntity<P, I>): boolean {
    return this.isSameClass(other) && this.id.equals(other.id)
  }

  /**
   * @description Get an instance copy.
   * @returns a copy of the entity.
   */
  clone<E extends BaseEntity<P, I>>(): E {
    const constructor = Reflect.getPrototypeOf(this)?.constructor
    if (!constructor)
      throw new Error('Cannot clone Entity: undefined constructor.')
    return Reflect.construct(constructor, [this.props, this.id])
  }

  get hashcode(): UniqueID {
    const constructor = Reflect.getPrototypeOf(this)?.constructor.name
    return UniqueID.from(
      `[${this.domainObjectType}@${constructor}]:${this.id.value}`
    ).data
  }
}
