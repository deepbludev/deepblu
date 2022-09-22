import { IIdentifiable } from '../types/entity.interface'
import { IDomainObjectProps, DomainObject } from './domain-object.abstract'
import { UniqueID } from './unique-id.abstract'
import { UUID } from './uuid.vo'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EntityProps extends IDomainObjectProps {}

/**
 * @class Entity
 * @classdesc Entity is a base class for all domain entities.
 * // TODO complete description
 * @see https://martinfowler.com/bliki/EvansClassification.html
 */
export class Entity<P extends EntityProps>
  extends DomainObject<P>
  implements IIdentifiable<UUID>
{
  public static ID = UUID
  protected readonly _id: UniqueID

  get id(): UUID {
    return this._id
  }

  protected constructor(props: P, id?: UUID) {
    super(props, 'Entity')
    this._id = id ?? UUID.create()
  }

  /**
   * @description Entities are compared by their id and class.
   * @returns true if the value objects are equal in value.
   */
  equals<E extends Entity<P>>(entity: E): boolean {
    return this.isSameClass(entity) && this.id.equals(entity.id)
  }

  /**
   * @description Get an instance copy.
   * @returns a copy of the entity.
   */
  clone<E extends Entity<P>>(): E {
    const constructor = Reflect.getPrototypeOf(this)?.constructor
    if (!constructor) throw new Error('Cannot clone entity')
    return Reflect.construct(constructor, [this.props, this.id.clone()])
  }
}
