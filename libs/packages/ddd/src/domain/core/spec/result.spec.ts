import { Result } from '../result'

type DummyPayload = { foo: string }

describe(Result, () => {
  it('should be defined', () => {
    expect(Result).toBeDefined()
  })

  const value: DummyPayload = { foo: 'bar' }
  const message = 'test error'
  let result: Result<DummyPayload>
  let results: Result<DummyPayload>[]
  let successes: Result<DummyPayload>[]
  let failures: Result<DummyPayload>[]

  beforeAll(() => {
    result = Result.ok()
  })

  describe('#success', () => {
    beforeAll(() => {
      result = Result.ok(value)
    })

    it('is a success', () => {
      expect(result.isOk).toBe(true)
      expect(result.isFail).toBe(false)
    })

    it('contains the given result value', () => {
      expect(result.data).toBe(value)
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
      expect(result.isOk).toBe(false)
      expect(result.isFail).toBe(true)
    })

    it('has a null result value', () => {
      expect(result.data).toBeNull()
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

  describe('#serialize', () => {
    beforeAll(() => {
      result = Result.ok(value)
    })

    it('returns a result as plain object', () => {
      result = Result.ok(value)
      expect(result.serialize()).toEqual({
        isOk: true,
        isFail: false,
        data: result.data,
        error: null,
      })

      result = Result.fail(message)
      expect(result.serialize()).toEqual({
        isOk: false,
        isFail: true,
        data: null,
        error: result.error,
      })
    })
  })
})
