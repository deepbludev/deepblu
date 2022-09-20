import { Result } from '../result'

type Payload = { foo: string }

describe('Result', () => {
  it('should be defined', () => {
    expect(Result).toBeDefined()
  })

  const value: Payload = { foo: 'bar' }
  const message = 'test error'
  let result: Result<Payload>
  let results: Result<Payload>[]
  let successes: Result<Payload>[]
  let failures: Result<Payload>[]

  beforeAll(() => {
    result = Result.ok()
  })

  describe('#success', () => {
    beforeAll(() => {
      result = Result.ok(value)
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
      result = Result.fail(message)
    })

    it('is a failure', () => {
      expect(result.isSuccess).toBe(false)
      expect(result.isFailure).toBe(true)
    })

    it('has a null result value', () => {
      expect(result.value).toBeNull()
    })

    it('has an error', () => {
      expect(result.error).toEqual(new Error(message))
    })
  })

  describe('#combine', () => {
    beforeAll(() => {
      successes = [Result.ok(), Result.ok()]
      failures = [Result.fail(), Result.fail()]
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
      result = Result.ok(value)
    })

    it('returns a result as plain object', () => {
      result = Result.ok(value)
      expect(result.toObject()).toEqual({
        isOk: true,
        isFail: false,
        value: result.value,
        error: null,
      })

      result = Result.fail(message)
      expect(result.toObject()).toEqual({
        isOk: false,
        isFail: true,
        value: null,
        error: result.error,
      })
    })
  })
})
