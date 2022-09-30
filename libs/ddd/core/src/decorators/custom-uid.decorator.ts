import { UniqueID } from '../core/unique-id.vo'
import { Type } from '../types/type.interface'

/**
 * Decorator to create a unique ID class with a static create method
 * with the given generator and validator functions.
 * @example
 * <pre>
 * @customUID({
 *  generator: () => new ObjectID().toHexString(),
 *  validator: (id: string) => ObjectID.isValid(id)
 * })
 * class ObjectID extends UniqueID {
 *   constructor(props: UniqueIDProps) {
 *     super(props)
 *   }
 * }
 *</pre>
 *
 * @param opts Options for the ID class. Object containing the generator and validator functions.
 * @returns class decorator
 */
export const customUID = (opts: {
  generator: () => string
  validator: (id: string) => boolean
}) =>
  function <
    T extends Type<UniqueID> & {
      generate: () => string
      validate: (id: string) => boolean
    }
  >(UniqueIDClass: T) {
    UniqueIDClass.generate = opts.generator
    UniqueIDClass.validate = opts.validator
    return UniqueIDClass
  }
