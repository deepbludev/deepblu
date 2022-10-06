export interface IUniqueID {
  value: string
  clone<T extends IUniqueID = IUniqueID>(): T
}
