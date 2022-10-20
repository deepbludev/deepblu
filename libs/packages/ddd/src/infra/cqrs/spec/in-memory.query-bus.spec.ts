// import { Result } from '../../../domain'
import {
  aggregates,
  AllAggregatesHandlerMock,
  EmptyQueryHandlerMock,
  FilteredAggregatesHandlerMock,
  ToggledAggregatesHandlerMock,
} from '../../../application/__mocks__'
import { EmptyQueryHandlerError, Result } from '../../../domain'
import {
  AllAggregatesStub,
  FilteredAggregatesStub,
  ToggledAggregatesStub,
} from '../../../domain/__mocks__'
import { InMemoryQueryBus } from '../in-memory.query-bus'

describe(InMemoryQueryBus, () => {
  it('sould be defined', () => {
    expect(InMemoryQueryBus).toBeDefined()
  })

  let querybus: InMemoryQueryBus

  let allQuery: AllAggregatesStub
  let filteredQuery: FilteredAggregatesStub
  let toggledQuery: ToggledAggregatesStub

  let allHandler: AllAggregatesHandlerMock
  let filteredHandler: FilteredAggregatesHandlerMock
  let toggledHandler: ToggledAggregatesHandlerMock
  let emptyQueryHandler: EmptyQueryHandlerMock

  let allHandlerSpy: jest.SpyInstance
  let filteredHandlerSpy: jest.SpyInstance
  let toggledHandlerSpy: jest.SpyInstance

  beforeAll(async () => {
    querybus = new InMemoryQueryBus()
    allQuery = AllAggregatesStub.with({})
    filteredQuery = FilteredAggregatesStub.with({ is: false })
    toggledQuery = ToggledAggregatesStub.with({})

    allHandler = new AllAggregatesHandlerMock()
    allHandlerSpy = jest.spyOn(allHandler, 'handle')

    filteredHandler = new FilteredAggregatesHandlerMock()
    filteredHandlerSpy = jest.spyOn(filteredHandler, 'handle')

    toggledHandler = new ToggledAggregatesHandlerMock()
    toggledHandlerSpy = jest.spyOn(toggledHandler, 'handle')

    emptyQueryHandler = new EmptyQueryHandlerMock()

    querybus.register([allHandler, filteredHandler])
  })

  it('should dispatch command', async () => {
    const allResponse = await querybus.get(allQuery)
    const someResponse = await querybus.get(filteredQuery)

    expect(allHandlerSpy).toHaveBeenCalledTimes(1)
    expect(allHandlerSpy).toHaveBeenCalledWith(allQuery)
    expect(allResponse).toEqual(Result.ok(aggregates))

    expect(filteredHandlerSpy).toHaveBeenCalledTimes(1)
    expect(filteredHandlerSpy).toHaveBeenCalledWith(filteredQuery)
    expect(someResponse).toEqual(Result.ok([aggregates[0]]))

    expect(toggledHandlerSpy).not.toHaveBeenCalled()
  })

  it('should throw error when command is not registered', () => {
    expect(querybus.get(toggledQuery)).rejects.toThrow()
  })

  it('should throw error when registering query handler not subscribed to any query', () => {
    expect(() => querybus.register([emptyQueryHandler])).toThrowError(
      EmptyQueryHandlerError.with(emptyQueryHandler)
    )
  })
})
