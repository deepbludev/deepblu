import {
  EventSubscriberMock,
  OtherEventSubscriberMock,
} from '../../../../application/__mocks__'
import {
  AggregateCreatedStub,
  AggregateToggledStub,
  PropsUpdatedStub,
} from '../../../../domain/__mocks__'
import { IEventSubscriber, IUniqueID } from '../../../../domain'
import { InMemoryAsyncEventBus } from '../in-memory-async.eventbus'

describe(InMemoryAsyncEventBus, () => {
  it('should be defined', () => {
    expect(InMemoryAsyncEventBus).toBeDefined()
  })

  let subscriber: IEventSubscriber
  let otherSubscriber: IEventSubscriber
  let eventbus: InMemoryAsyncEventBus
  let aggrId: IUniqueID
  let createEvent: AggregateCreatedStub
  let updateEvent: PropsUpdatedStub
  let toggleEvent: AggregateToggledStub

  let emitSpy: jest.SpyInstance

  beforeAll(async () => {
    subscriber = new EventSubscriberMock()
    otherSubscriber = new OtherEventSubscriberMock()
    eventbus = new InMemoryAsyncEventBus()

    aggrId = IUniqueID.create()
    createEvent = AggregateCreatedStub.with({ foo: 'bar', is: true }, aggrId)
    updateEvent = PropsUpdatedStub.with({ foo: 'baz' }, aggrId)
    toggleEvent = AggregateToggledStub.with({}, aggrId)

    emitSpy = jest.spyOn(eventbus, 'emit')

    eventbus.register([subscriber, otherSubscriber])
    await eventbus.publish([createEvent, updateEvent, toggleEvent])
  })

  it('should be able to register subscribers', () => {
    expect(eventbus.listenerCount(AggregateCreatedStub.canonical)).toBe(1)
    expect(eventbus.listenerCount(PropsUpdatedStub.canonical)).toBe(2)
    expect(eventbus.listenerCount(AggregateToggledStub.canonical)).toBe(1)
  })

  it('should be able to publish events', () => {
    expect(emitSpy).toHaveBeenCalledTimes(3)
    expect(emitSpy).toHaveBeenCalledWith(createEvent.canonical, createEvent)
    expect(emitSpy).toHaveBeenCalledWith(updateEvent.canonical, updateEvent)
    expect(emitSpy).toHaveBeenCalledWith(toggleEvent.canonical, toggleEvent)
  })
})
