import { Container } from '../container'
import { provider } from '../provider.decorator'

@provider()
class MockProvider1 {}

@provider()
class MockProvider2 {
  constructor(public readonly service: MockProvider1) {}
}

class MockProvider3 {
  constructor(public readonly service: MockProvider2) {}
}

describe('Container', () => {
  let container: Container<MockProvider1>
  let provider1: MockProvider1
  let provider2: MockProvider2
  let provider3: MockProvider3

  beforeAll(() => {
    container = new Container()
    provider1 = new MockProvider1()
    provider2 = new MockProvider2(provider1)
    provider3 = new MockProvider3(provider2)
  })

  it('should be defined', () => {
    expect(Container).toBeDefined()
  })
  it('should have a list of providers mapped by token', () => {
    container.add(MockProvider1, provider1)
    container.add(MockProvider2, provider2)
    expect(container.get(MockProvider1)).toBeInstanceOf(MockProvider1)
    expect(container.get(MockProvider2)).toBeInstanceOf(MockProvider2)
    expect(container.get<MockProvider2>(MockProvider2).service).toBeInstanceOf(
      MockProvider1
    )
    expect(container.providers.length).toBe(2)
  })

  it('should throw an error if a provider for a token already exists', () => {
    expect(() => {
      container.add(MockProvider1, provider1)
      container.add(MockProvider1, new MockProvider1())
    }).toThrowError()
  })

  it('should only accept injectables as providers', () => {
    expect(() => container.add(MockProvider3, provider3)).toThrow()
  })
})
