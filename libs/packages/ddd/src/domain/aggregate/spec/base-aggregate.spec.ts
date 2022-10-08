import { UniqueID } from '../../uid/unique-id.vo'
import { MockAggregate } from './__mocks__/mock.aggregate'
import {
  MockPropsUpdated,
  MockToggled,
} from './__mocks__/events.mock.aggregate'

describe('AggregateBase', () => {
  let aggregate: MockAggregate

  beforeEach(
    () => (aggregate = MockAggregate.create({ foo: 'bar', is: true }).data)
  )

  it('should be a Aggregate domain object type', () => {
    expect(aggregate.domainObjectType).toEqual('Aggregate')
  })

  it('should have a hashcode based on its id, class name and domain object type', () => {
    const expectedHashCode = UniqueID.from(
      `[Aggregate@MockAggregate]:${aggregate.id.value}`
    ).data
    expect(aggregate.hashcode.equals(expectedHashCode)).toBeTruthy()
  })

  it('should have a new uncommited event after a new event is applied', () => {
    aggregate.updateProps({ foo: 'bar2' })
    expect(aggregate.changes.length).toEqual(2)
    expect(aggregate.props).toEqual({ foo: 'bar2', is: true })
    aggregate.toggle()
    expect(aggregate.changes.length).toEqual(3)
    expect(aggregate.props).toEqual({ foo: 'bar2', is: false })
  })

  it('should have no uncommited events after changes are commited', () => {
    const changes = aggregate.changes
    expect(aggregate.commit()).toEqual(changes)
    expect(aggregate.changes.length).toEqual(0)
  })

  it('should be able to tell if it has changes', () => {
    aggregate.commit()
    expect(aggregate.hasChanges).toBeFalsy()
    aggregate.updateProps({ foo: 'bar2' })
    expect(aggregate.hasChanges).toBeTruthy()
    aggregate.commit()
    expect(aggregate.hasChanges).toBeFalsy()
  })

  it('should be able to be rehydrated from a list of events', () => {
    const original = MockAggregate.create({ foo: 'bar', is: true }).data
    original.updateProps({ foo: 'bar2', is: false })
    original.toggle()

    const changes = [...original.changes]
    const rehydrated = MockAggregate.rehydrate<MockAggregate>(
      original.id,
      changes
    )

    expect(original.changes.length).toEqual(3)
    expect(rehydrated.changes.length).toEqual(0)
    expect(rehydrated.id.equals(original.id)).toBeTruthy()
    expect(rehydrated.props).toEqual(original.props)
    expect(rehydrated.equals(original)).toBeTruthy()
    expect(rehydrated.version).toBe(2)
  })

  it('should be able to take a snapshot', () => {
    const original = MockAggregate.create({ foo: 'bar', is: true }).data
    original.updateProps({ foo: 'bar2', is: false })
    original.toggle()

    const snapshot = original.snapshot(15)

    expect(snapshot.id.equals(original.id)).toBeTruthy()
    expect(snapshot.props).toEqual(original.props)
    expect(snapshot.version).toBe(15)
    expect(snapshot.changes.length).toBe(0)
  })

  it('should be able to be rehydrated from a list of events and a snapshot', () => {
    const original = MockAggregate.create({ foo: 'bar', is: true }).data
    original.updateProps({ foo: 'bar2', is: false })
    original.toggle()

    const snapshot: MockAggregate = original.snapshot(10)
    const changes = [
      new MockPropsUpdated(snapshot.id.value, { foo: 'bar3' }),
      new MockPropsUpdated(snapshot.id.value, { foo: 'bar4' }),
      new MockToggled(snapshot.id.value, {}),
      new MockToggled(snapshot.id.value, {}),
    ]

    const rehydrated = MockAggregate.rehydrate<MockAggregate>(
      snapshot.id,
      changes,
      snapshot
    )

    expect(rehydrated.equals(snapshot)).toBeTruthy()
    expect(rehydrated.props).toEqual({ foo: 'bar4', is: true })
    expect(rehydrated.version).toBe(14)
    expect(rehydrated.changes.length).toEqual(0)
  })

  it('should be able to be cloned', () => {
    const original = MockAggregate.create({ foo: 'bar', is: true }).data
    original.updateProps({ foo: 'bar2', is: false })
    original.toggle()
    const clone = original.clone<MockAggregate>()

    expect(clone.equals(original)).toBeTruthy()
    expect(clone.id.equals(original.id)).toBeTruthy()
    expect(clone.props.foo).toEqual(original.props.foo)
    expect(clone.props.is).toEqual(original.props.is)
  })
})
