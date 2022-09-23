import { UniqueID } from '../core/unique-id'

export interface IIdentifiable<T extends UniqueID = UniqueID> {
  id: T
}
