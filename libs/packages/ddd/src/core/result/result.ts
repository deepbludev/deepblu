import isString from 'lodash/isString'

export type ResultError = Error | string

export class Result<TValue = unknown, E extends { message: string } = Error> {
  protected constructor(
    public readonly isSuccess: boolean,
    public readonly payload: TValue | null,
    public readonly message: string,
    public readonly errors: E[] = []
  ) {}

  get isFailure() {
    return !this.isSuccess
  }

  public static success<T = void>(opts?: {
    payload?: T
    message?: string
  }): Result<T> {
    return new Result<T>(
      true,
      opts?.payload ?? null,
      opts?.message || 'success'
    )
  }

  public static failure(opts?: {
    message?: string
    errors?: ResultError[]
  }): Result<void> {
    const defaultError = new Error(opts?.message || 'Result failure')
    const errors = opts?.errors?.map(e =>
      isString(e) ? new Error(e as string) : e
    ) || [defaultError]
    if (!errors.length) errors.push(defaultError)

    return new Result<null>(false, null, opts?.message || 'failure', errors)
  }

  public static combine(results: Result[]): Result {
    const errors = results.reduce(
      (acc, r) => [...acc, ...r.errors],
      [] as Error[]
    )
    return errors.length ? Result.failure({ errors }) : Result.success()
  }
}
