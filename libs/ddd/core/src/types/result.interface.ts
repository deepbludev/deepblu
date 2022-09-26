export interface IResult<V, E extends Error> {
  data: V
  error: E
  isFail: boolean
  isOk: boolean
}
