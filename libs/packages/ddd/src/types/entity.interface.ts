import { UniqueID } from '../core/unique-id.abstract'

export interface IIdentifiable<T extends UniqueID = UniqueID> {
  id: T
}
