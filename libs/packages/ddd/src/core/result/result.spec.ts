import { Result } from './result'

type Payload = { foo: string }
type Meta = { data: string }

describe('Result', () => {
  const value: Payload = { foo: 'bar' }
  const error = 'test error'
  const meta: Meta = { data: 'test metadata' }
  let result: Result<Payload, string, Meta>
  let results: Result<Payload, string, Meta>[]
  let successes: Result<Payload, string, Meta>[]
  let failures: Result<Payload, string, Meta>[]

  beforeAll(() => {
    result = Result.success()
  })

  describe('#success', () => {
    beforeAll(() => {
      result = Result.success(value, meta)
    })

    it('is a success', () => {
      expect(result.isSuccess).toBe(true)
      expect(result.isFailure).toBe(false)
    })

    it('contains the given result value', () => {
      expect(result.value).toBe(value)
      expect(result.meta).toBe(meta)
    })

    it('has an empty null error', () => {
      expect(result.error).toBeNull()
    })
  })

  describe('#failure', () => {
    beforeAll(() => {
      result = Result.failure(error, meta)
    })

    it('is a failure', () => {
      expect(result.isSuccess).toBe(false)
      expect(result.isFailure).toBe(true)
    })

    it('has a null result value', () => {
      expect(result.value).toBeNull()
      expect(result.meta).toBe(meta)
    })

    it('has an error', () => {
      expect(result.error).toEqual(error)
    })
  })

  describe('#combine', () => {
    beforeAll(() => {
      successes = [Result.success(), Result.success()]
      failures = [Result.failure(), Result.failure()]
      results = [...successes, ...failures]
    })

    it('succeedes only with none failure error given', () => {
      expect(Result.combine(successes)).toEqual(successes[0])
    })

    it('fails with at least one failure error given', () => {
      expect(Result.combine(results)).toEqual(failures[0])
    })
  })

  describe('#toObject', () => {
    beforeAll(() => {
      result = Result.success(value)
    })

    it('returns a result as plain object', () => {
      result = Result.success(value, meta)
      expect(result.toObject()).toEqual({
        isOk: true,
        isFail: false,
        value: result.value,
        error: null,
        meta: result.meta,
      })

      result = Result.failure(error, meta)
      expect(result.toObject()).toEqual({
        isOk: false,
        isFail: true,
        value: null,
        error: result.error,
        meta: result.meta,
      })
    })
  })
})
