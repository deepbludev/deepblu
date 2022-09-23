export interface IResult<V, E extends Error> {
  value: V
  error: E
  isFail: boolean
  isOk: boolean
}
