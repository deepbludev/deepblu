import { CustomString } from './custom-string.vo'
import { InvalidStringError } from './invalid-string.error'
import { customString } from './custom-string.decorator'

describe(CustomString, () => {
  const subject = CustomString.create('Test sTRINg').data
  const otherSubject = CustomString.create('Test  string ').data

  it('should be defined', () => {
    expect(CustomString.create).toBeDefined()
  })

  it('should create a valid string without custom validator', () => {
    expect(CustomString.create('valid string').isOk).toBeTruthy()
  })

  it('should fail if provided an empty string', () => {
    expect(CustomString.create('').isFail).toBeTruthy()
  })

  it('should fail if provided a string longer than 255 characters', () => {
    expect(CustomString.create('a'.repeat(256)).isFail).toBeTruthy()
  })

  it('should get original value', () => {
    expect(subject.value).toEqual('Test sTRINg')
  })

  it('should get original length', () => {
    expect(subject.length).toEqual(11)
  })

  it('should get uppercase value', () => {
    expect(subject.uppercase).toEqual('TEST STRING')
    expect(otherSubject.uppercase).toEqual('TEST  STRING ')
  })

  it('should get lowercase value', () => {
    expect(subject.lowercase).toEqual('test string')
    expect(otherSubject.lowercase).toEqual('test  string ')
  })

  it('should get capitalized value', () => {
    expect(subject.capitalized).toEqual('Test string')
    expect(otherSubject.capitalized).toEqual('Test  string ')
  })

  it('should get camel case value', () => {
    expect(subject.camelCase).toEqual('testSTRINg')
    expect(otherSubject.camelCase).toEqual('testString')
  })

  it('should get snake case value', () => {
    expect(subject.snakeCase).toEqual('test_s_t_r_i_ng')
    expect(otherSubject.snakeCase).toEqual('test_string')
  })

  it('should get kebab case value', () => {
    expect(subject.kebabCase).toEqual('test-s-t-r-i-ng')
    expect(otherSubject.kebabCase).toEqual('test-string')
  })

  it('should get dot case value', () => {
    expect(subject.dotCase).toEqual('test.s.t.r.i.ng')
    expect(otherSubject.dotCase).toEqual('test.string')
  })

  it('should get title case value', () => {
    expect(subject.titleCase).toEqual('Test S T R I Ng')
    expect(otherSubject.titleCase).toEqual('Test String')
  })

  it('should get path case value', () => {
    expect(subject.pathCase).toEqual('test/string')
    expect(otherSubject.pathCase).toEqual('test/string')
  })

  it('should get constant case value', () => {
    expect(subject.constantCase).toEqual('TEST_S_T_R_I_NG')
    expect(otherSubject.constantCase).toEqual('TEST_STRING')
  })

  describe('Custom validator', () => {
    const validator = (value: string) => value.startsWith('valid')
    const message = (value: string) => 'Custom error message: ' + value

    it('should create a valid string if validator does not fail', () => {
      expect(CustomString.create('valid string', validator, message).isOk).toBe(
        true
      )
    })

    it('should fail if validator fails', () => {
      expect(CustomString.create('invalid', validator, message).error).toEqual(
        InvalidStringError.with('Custom error message: invalid')
      )
    })

    describe('@customString decorator', () => {
      it('should set custom validator', () => {
        @customString({ validator, message })
        class TestString extends CustomString {}

        const validString = TestString.create('valid string')
        const invalidString = TestString.create('invalid')

        expect(validString.isOk).toBeTruthy()
        expect(invalidString.isFail).toBeTruthy()
        expect(invalidString.error).toEqual(
          InvalidStringError.with('Custom error message: invalid')
        )
      })
    })
  })
})
