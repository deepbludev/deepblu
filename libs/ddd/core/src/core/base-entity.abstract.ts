/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { IIdentifiable } from '../types/identifiable.interface'
import { IDomainObjectProps, DomainObject } from './domain-object.abstract'
import { UniqueID } from './unique-id'
import { UUID } from './uuid.vo'

// export type EntityConstructor = new () => Entity<EntityProps>
export type IDGenerator<T extends UniqueID> = () => T

/**
 * Decorator used to set the id generator for an entity in the case
 * that other than the default UUID generator is needed.
 * A typical use case would be to use ObjectID from MongoDB instead of UUID.
 * In this case, you would need to create a custom generator that returns
 * ObjectID instead of UUID, where the ObjectID is generated by MongoDB and wrapped
 * in a ValueObject class.
 *
 * @example
 * @id(ObjectID.create)
 * class MyEntity extends BaseEntity<Props, ObjectID> {
 *   constructor(props: MyEntityProps, id?: ObjectID) {
 *     super(props, id)
 *   }
 * }
 *
 * @param generator A function that generates UniqueID values for the entity.
 * @returns class decorator
 */
export const id = <T extends UniqueID>(generator: IDGenerator<T>) =>
  function <T extends { new (...args: any[]): {} }>(EntityClass: T) {
    return class extends EntityClass {
      readonly id: ReturnType<typeof generator>
      readonly _idGenerator = generator
      protected constructor(...args: any[]) {
        super(args[0], 'Entity')
        this.id = args[1] ?? this._idGenerator()
      }
    }
  }

// eslint-disable-next-line @typescript-eslint/no-empty-interface
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

export abstract class BaseEntity<P extends IEntityProps, TID extends UniqueID>
  extends DomainObject<P>
  implements IIdentifiable<TID>
{
  public readonly id: TID
  protected _idGenerator = UUID.create as IDGenerator<TID>
  protected constructor(props: P, id?: TID) {
    super(props, 'Entity')
    this.id = id ?? (UniqueID.create() as TID)
  }

  /**
   * @description Entities are compared by their id and class.
   * @returns true if the value objects are equal in value.
   */
  equals<E extends BaseEntity<P, TID>>(entity: E): boolean {
    return this.isSameClass(entity) && this.id.equals(entity.id)
  }

  /**
   * @description Get an instance copy.
   * @returns a copy of the entity.
   */
  clone<E extends BaseEntity<P, TID>>(): E {
    const constructor = Reflect.getPrototypeOf(this)?.constructor
    if (!constructor) throw new Error('Cannot clone entity')
    return Reflect.construct(constructor, [this.props, this.id.clone()])
  }
}
