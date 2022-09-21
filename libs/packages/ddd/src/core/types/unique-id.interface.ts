export interface IUniqueID {
  value: string
  isNew: boolean
  equal<T extends IUniqueID = IUniqueID>(id: T): boolean
  clone<T extends IUniqueID = IUniqueID>(): T
  cloneAsNew<T extends IUniqueID = IUniqueID>(): T
}
