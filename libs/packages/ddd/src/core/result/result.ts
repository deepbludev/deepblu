export interface IResult<V = void, E = string, M = string> {
  value: V
  error: E
  meta: M
  isFail: boolean
  isOk: boolean
  toObject(): IResultObject<V, E, M>
}

export interface IResultObject<V, E, M> {
  value: V
  error: E
  meta: M
  isFail: boolean
  isOk: boolean
}

export class Result<V = void, E = string, M = string>
  implements IResult<V, E, M>
{
  protected constructor(
    public readonly isSuccess: boolean,
    private readonly _payload: V | null,
    private readonly _error: E | null,
    private readonly _meta: M | null
  ) {}

  public static success<V, E, M>(value?: V, meta?: M): Result<V, E, M> {
    return new Result(true, value, null, meta) as unknown as Result<V, E, M>
  }

  public static failure<V, E, M>(error?: E, meta?: M): Result<V, E, M> {
    return new Result(false, null, error, meta) as unknown as Result<V, E, M>
  }

  public static combine<V, E, M>(results: Result<V, E, M>[]): Result<V, E, M> {
    const error = 'No results provided as parameters' as unknown as E
    if (!results.length) return Result.failure<V, E, M>(error)
    for (const result of results) if (result.isFailure) return result
    return results.at(0) as Result<V, E, M>
  }

  toObject(): IResultObject<V, E, M> {
    return {
      value: this.value,
      error: this.error,
      meta: this.meta,
      isFail: this.isFail,
      isOk: this.isOk,
    }
  }

  get isFailure() {
    return !this.isSuccess
  }

  get isFail() {
    return this.isFailure
  }

  get isOk() {
    return this.isSuccess
  }

  get value() {
    return this._payload as V
  }

  get error() {
    return this._error as E
  }

  get meta() {
    return this._meta as M
  }
}
