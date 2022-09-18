export interface IResult<V = void, E = string> {
  value: V
  error: E
  isFail: boolean
  isOk: boolean
}

export interface IResultObject<V = void, E = string> {
  value: V
  error: E
  isFail: boolean
  isOk: boolean
}

export class Result<V = void, E = string> implements IResult<V, E> {
  protected constructor(
    public readonly isSuccess: boolean,
    private readonly _payload: V | null,
    private readonly _error: E | null
  ) {}

  public static success<V, E>(value?: V): Result<V, E> {
    return new Result(true, value, null) as unknown as Result<V, E>
  }

  public static failure<V, E>(error?: E): Result<V, E> {
    return new Result(false, null, error) as unknown as Result<V, E>
  }

  public static combine<V, E>(results: Result<V, E>[]): Result<V, E> {
    const error = 'No results provided as parameters' as unknown as E
    if (!results.length) return Result.failure<V, E>(error)
    for (const result of results) if (result.isFailure) return result
    return results.at(0) as Result<V, E>
  }

  toObject(): IResultObject<V, E> {
    return {
      value: this.value,
      error: this.error,
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
}
