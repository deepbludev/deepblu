import { MockAggregate } from '../../../../domain/__mocks__/mock.aggregate'
import { MockEventStream } from '../../../__mocks__/mock.event-stream'
import { IEventStream } from '../event-stream.interface'

describe(IEventStream, () => {
  let stream: MockEventStream

  beforeEach(() => {
    stream = new MockEventStream()
  })

  it('should be defined', () => {
    expect(IEventStream).toBeDefined()
  })

  it('should have a stream name', () => {
    expect(stream.name).toEqual(MockAggregate.name)
  })
})
