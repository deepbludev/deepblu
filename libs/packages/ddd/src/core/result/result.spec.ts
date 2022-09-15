import type { ResultError } from './result'
import { Result } from './result'

type Payload = { foo: string }

describe('Result', () => {
  const payload: Payload = { foo: 'bar' }
  const message = 'test message'
  let result: Result<Payload>
  let results: Result[]
  let successes: Result[]
  let failures: Result[]

  beforeAll(() => {
    result = Result.success()
  })

  it('has a non-empty result message', () => {
    expect(result.message).toBeTruthy()
    expect(result.message).not.toBe('')
  })

  it('contains the given result message', () => {
    result = Result.success({ message })
    expect(result.message).toEqual(message)
  })

  describe('#success', () => {
    beforeAll(() => {
      result = Result.success({ payload, message })
    })

    it('is a success', () => {
      expect(result.isSuccess).toBe(true)
      expect(result.isFailure).toBe(false)
    })

    it('contains the given result value', () => {
      expect(result.payload).toBe(payload)
    })

    it('has an empty error list', () => {
      expect(result.errors).toEqual([])
    })

    it('has a default success message', () => {
      result = Result.success({ payload })
      expect(result.message).toEqual('success')
    })
  })

  describe('#failure', () => {
    beforeAll(() => {
      const errors: ResultError[] = [
        new Error('test error'),
        'test error string',
      ]
      result = Result.failure({ message, errors })
    })

    it('is a failure', () => {
      expect(result.isSuccess).toBe(false)
      expect(result.isFailure).toBe(true)
    })

    it('has a null result value', () => {
      expect(result.payload).toBeNull()
    })

    it('has an error list when created with errors', () => {
      expect(result.errors).toHaveLength(2)
    })

    it('has a default success message and error', () => {
      result = Result.failure()
      expect(result.message).toEqual('failure')
      expect(result.errors).toEqual([new Error('Result failure')])

      result = Result.failure({ errors: [] })
      expect(result.message).toEqual('failure')
      expect(result.errors).toEqual([new Error('Result failure')])
    })
  })

  describe('#combine', () => {
    beforeAll(() => {
      successes = [Result.success(), Result.success()]
      failures = [Result.failure(), Result.failure()]
      results = [...successes, ...failures]
    })

    it('succeedes only with none failure error given', () => {
      expect(Result.combine(successes).isSuccess).toBe(true)
    })

    it('fails with at least one failure error given', () => {
      expect(Result.combine(results).isSuccess).toBe(false)
    })

    it('combines the given result errors', () => {
      expect(Result.combine(results).errors.length).toBe(2)
    })
  })
})
