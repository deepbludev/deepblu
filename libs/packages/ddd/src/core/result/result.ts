export interface IResult<V = void, E = string> {
  value: V
  error: E
  isFail: boolean
  isOk: boolean
  toObject(): IResultObject<V, E>
}

export interface IResultObject<V, E> {
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

  public static ok<V, E>(value?: V): Result<V, E> {
    return new Result(true, value, null) as unknown as Result<V, E>
  }

  public static fail<V, E>(error?: E): Result<V, E> {
    return new Result(false, null, error) as unknown as Result<V, E>
  }

  public static combine<V, E>(results: Result<V, E>[]): Result<void, E> {
    for (const r of results) if (r.isFailure) return Result.fail(r.error)
    return Result.ok()
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
