import { CreateAggregateHandlerMock } from '../../../application/__mocks__/command-handler.mock'
import { IUniqueID, Result } from '../../../domain'
import { CreateAggregateStub } from '../../../domain/__mocks__'
import { InMemoryCommandBus } from '../in-memory.command-bus'

describe(InMemoryCommandBus, () => {
  it('sould be defined', () => {
    expect(InMemoryCommandBus).toBeDefined()
  })
  let commandBus: InMemoryCommandBus
  let aggrId: string
  let createCommand: CreateAggregateStub
  let handler: CreateAggregateHandlerMock
  let handleSpy: jest.SpyInstance

  beforeAll(async () => {
    commandBus = new InMemoryCommandBus()
    aggrId = IUniqueID.create().value
    createCommand = CreateAggregateStub.with({
      foo: 'bar',
      is: true,
      id: aggrId,
    })
    handler = new CreateAggregateHandlerMock()
    handleSpy = jest.spyOn(handler, 'handle')

    commandBus.register([handler])
  })

  it('should dispatch command', async () => {
    const response = await commandBus.dispatch(createCommand)
    expect(handleSpy).toHaveBeenCalledTimes(1)
    expect(handleSpy).toHaveBeenCalledWith(createCommand)
    expect(response).toEqual(Result.ok())
  })

  it('should throw error when command is not registered', () => {
    const emptyCommandBus = new InMemoryCommandBus()
    expect(emptyCommandBus.dispatch(createCommand)).rejects.toThrow()
  })
})
