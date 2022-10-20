import {
  CreateAggregateHandlerMock,
  EmptyCommandHandlerMock,
  ToggleAggregateHandlerMock,
  UpdatePropsHandlerMock,
} from '../../../application/__mocks__'
import { EmptyCommandHandlerError, IUniqueID, Result } from '../../../domain'
import {
  CreateAggregateStub,
  ToggleAggregateStub,
  UpdatePropsStub,
} from '../../../domain/__mocks__'
import { InMemoryCommandBus } from '../in-memory.command-bus'

describe(InMemoryCommandBus, () => {
  it('sould be defined', () => {
    expect(InMemoryCommandBus).toBeDefined()
  })
  let commandbus: InMemoryCommandBus
  let aggrId: string

  let createCommand: CreateAggregateStub
  let updatePropsCommand: UpdatePropsStub
  let toggleCommand: ToggleAggregateStub

  let createHandler: CreateAggregateHandlerMock
  let updatePropsHandler: UpdatePropsHandlerMock
  let toggleAggregateHandler: ToggleAggregateHandlerMock
  let emptyCommandHandler: EmptyCommandHandlerMock

  let createHandlerSpy: jest.SpyInstance
  let updatePropsHandlerSpy: jest.SpyInstance
  let toggleAggregateHandlerSpy: jest.SpyInstance

  beforeAll(async () => {
    commandbus = new InMemoryCommandBus()
    aggrId = IUniqueID.create().value
    createCommand = CreateAggregateStub.with({
      foo: 'bar',
      is: true,
      id: aggrId,
    })

    updatePropsCommand = UpdatePropsStub.with({
      foo: 'baz',
      is: false,
      id: aggrId,
    })
    toggleCommand = ToggleAggregateStub.with({
      id: aggrId,
    })

    createHandler = new CreateAggregateHandlerMock()
    createHandlerSpy = jest.spyOn(createHandler, 'handle')

    updatePropsHandler = new UpdatePropsHandlerMock()
    updatePropsHandlerSpy = jest.spyOn(updatePropsHandler, 'handle')

    toggleAggregateHandler = new ToggleAggregateHandlerMock()
    toggleAggregateHandlerSpy = jest.spyOn(toggleAggregateHandler, 'handle')

    emptyCommandHandler = new EmptyCommandHandlerMock()

    commandbus.register([createHandler, updatePropsHandler])
  })

  it('should dispatch command', async () => {
    const createResponse = await commandbus.dispatch(createCommand)
    const updatePropsResponse = await commandbus.dispatch(updatePropsCommand)

    expect(createHandlerSpy).toHaveBeenCalledTimes(1)
    expect(createHandlerSpy).toHaveBeenCalledWith(createCommand)
    expect(createResponse).toEqual(Result.ok())

    expect(updatePropsHandlerSpy).toHaveBeenCalledTimes(1)
    expect(updatePropsHandlerSpy).toHaveBeenCalledWith(updatePropsCommand)
    expect(updatePropsResponse).toEqual(Result.ok())

    expect(toggleAggregateHandlerSpy).not.toHaveBeenCalled()
  })

  it('should throw error when command is not registered', () => {
    expect(commandbus.dispatch(toggleCommand)).rejects.toThrow()
  })

  it('should throw error when registering command handler not subscribed to any command', () => {
    expect(() => commandbus.register([emptyCommandHandler])).toThrowError(
      EmptyCommandHandlerError.with(emptyCommandHandler)
    )
  })
})
