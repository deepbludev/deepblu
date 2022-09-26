import v from '../utils/validator'
import { ISerializable } from '../types/serializable.interface'
import { IResult } from '../types/result.interface'

/**
 * @class Result
 * @classdesc Result is a monad that represents a value or an error.
 * It is used to return a value or an error from a function.
 * Particularily useful for functions that can fail.
 * Also useful for functions that can return a value or throw an error.
 * In DDD, it is used to return a value or an error from domain services,
 * commands / queries / usecases, or aggregate / entity / value object creation.
 * @see https://en.wikipedia.org/wiki/Monad_(functional_programming)
 */
export class Result<V = void, E extends Error = Error>
  implements IResult<V, E>, ISerializable<IResult<V, E>>
{
  protected constructor(
    public readonly isOk: boolean,
    private readonly _payload: V | null,
    private readonly _error: E | null
  ) {}

  public static ok<V, E extends Error = Error>(payload?: V): Result<V, E> {
    return new Result(true, payload, null) as unknown as Result<V, E>
  }

  public static fail<V, E extends Error>(
    errorOrMessage?: E | string
  ): Result<V, E> {
    const error: E =
      v.string(errorOrMessage) || errorOrMessage === undefined
        ? (new Error(errorOrMessage as string) as E)
        : errorOrMessage
    return new Result(false, null, error) as unknown as Result<V, E>
  }

  public static combine<V, E extends Error>(
    results: Result<V, E>[]
  ): Result<void, E> {
    for (const r of results) if (r.isFail) return Result.fail(r.error)
    return Result.ok()
  }

  serialize(): IResult<V, E> {
    return {
      data: this.data,
      error: this.error,
      isFail: this.isFail,
      isOk: this.isOk,
    }
  }

  get isFail() {
    return !this.isOk
  }

  get data() {
    return this._payload as V
  }

  get error() {
    return this._error as E
  }
}
