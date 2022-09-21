export interface IUniqueID {
  value: string
  isNew: boolean
  createdAt: Date
  equal<T extends IUniqueID = IUniqueID>(id: T): boolean
  deepEqual<T extends IUniqueID = IUniqueID>(id: T): boolean
  cloneAsNew<T extends IUniqueID = IUniqueID>(): T
  clone<T extends IUniqueID = IUniqueID>(): T
}
