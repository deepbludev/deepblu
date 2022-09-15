import isString from 'lodash/isString'

export type ResultError = Error | string

export interface IResult<T = void, E = Error> {
  value: T
  message: string
  errors: E[]
  isFail: boolean
  isOk: boolean
}

export interface IResultDTO<T = void, E = Error> {
  value: T | null
  message: string
  errors: E[]
  isFail: boolean
  isOk: boolean
}

export class Result<T = void, E = Error> implements IResult<T, E> {
  protected constructor(
    public readonly isSuccess: boolean,
    public readonly payload: T | null,
    public readonly message: string,
    public readonly errors: E[] = []
  ) {}

  public static success<T, E = Error>(opts?: {
    payload?: T
    message?: string
  }): Result<T, E> {
    return new Result(
      true,
      opts?.payload ?? null,
      opts?.message || 'success'
    ) as unknown as Result<T, E>
  }

  public static failure<T, E = Error>(opts?: {
    message?: string
    errors?: ResultError[]
  }): Result<T, E> {
    const defaultError = new Error(opts?.message || 'Result failure')
    const errors = opts?.errors?.map(e =>
      isString(e) ? new Error(e as string) : e
    ) || [defaultError]
    if (!errors.length) errors.push(defaultError)

    return new Result(
      false,
      null,
      opts?.message || 'failure',
      errors
    ) as unknown as Result<T, E>
  }

  public static combine(results: Result[]): Result {
    const errors = results.reduce(
      (acc, r) => [...acc, ...r.errors],
      [] as Error[]
    )
    return errors.length ? Result.failure({ errors }) : Result.success()
  }

  // toDTO method
  public toDTO(): IResultDTO<T, E> {
    return {
      value: this.payload,
      message: this.message,
      errors: this.errors,
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

  get value(): T {
    return this.payload as T
  }
}
