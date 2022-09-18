import { Result } from './result'

type Payload = { foo: string }

describe('Result', () => {
  const value: Payload = { foo: 'bar' }
  const error = 'test error'
  let result: Result<Payload>
  let results: Result[]
  let successes: Result[]
  let failures: Result[]

  beforeAll(() => {
    result = Result.success()
  })

  describe('#success', () => {
    beforeAll(() => {
      result = Result.success(value)
    })

    it('is a success', () => {
      expect(result.isSuccess).toBe(true)
      expect(result.isFailure).toBe(false)
    })

    it('contains the given result value', () => {
      expect(result.value).toBe(value)
    })

    it('has an empty null error', () => {
      expect(result.error).toBeNull()
    })
  })

  describe('#failure', () => {
    beforeAll(() => {
      result = Result.failure(error)
    })

    it('is a failure', () => {
      expect(result.isSuccess).toBe(false)
      expect(result.isFailure).toBe(true)
    })

    it('has a null result value', () => {
      expect(result.value).toBeNull()
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
      result = Result.success(value)
      expect(result.toObject()).toEqual({
        isOk: true,
        isFail: false,
        value: result.value,
        error: null,
      })

      result = Result.failure(error)
      expect(result.toObject()).toEqual({
        isOk: false,
        isFail: true,
        value: null,
        error: result.error,
      })
    })
  })
})
