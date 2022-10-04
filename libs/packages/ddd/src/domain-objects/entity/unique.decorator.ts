/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Constructor } from '../../interfaces'
import { UniqueID } from '../uid/unique-id.vo'

/**
 * Decorator used to set the id generator for an entity in the case
 * that other than the default UUID generator is needed.
 * A typical use case would be to use ObjectID from MongoDB instead of UUID.
 * In this case, you would need to create a custom generator that returns
 * ObjectID instead of UUID, where the ObjectID is generated by MongoDB and wrapped
 * in a ValueObject class.
 *
 * @example
 * @unique(ObjectID)
 * class MyEntity extends BaseEntity<Props, ObjectID> {
 *   constructor(props: MyEntityProps, id?: ObjectID) {
 *     super(props, id)
 *   }
 * }
 *
 * @param idType A class that extends UniqueID.
 * @returns class decorator
 */
export const unique = <I extends typeof UniqueID>(idType: I) =>
  function <T extends Constructor>(BaseClass: T) {
    const UniqueClass = class extends BaseClass {
      readonly id: I
      protected constructor(...[props, id]: any[]) {
        super(props)
        this.id = id ?? idType.create()
      }
    }
    Object.defineProperty(UniqueClass, 'name', { value: BaseClass.name })
    return UniqueClass
  }
