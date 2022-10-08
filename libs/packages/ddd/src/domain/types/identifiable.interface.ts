import { UniqueID } from '../uid/unique-id.vo'

export interface IIdentifiable<T extends UniqueID = UniqueID> {
  id: T
}
