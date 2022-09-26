import { UniqueID } from '../core/unique-id.vo'

export interface IIdentifiable<T extends UniqueID = UniqueID> {
  id: T
}
