import { IUniqueID } from '../uid/unique-id.vo'

export interface IIdentifiable<T extends IUniqueID = IUniqueID> {
  id: T
}
