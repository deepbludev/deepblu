import { AggregateStub } from '../../__mocks__'
import {
  AggregateToggledStub,
  PropsUpdatedStub,
} from '../../__mocks__/events.stub'
import { IAggregateRoot } from '../aggregate-root.abstract'

describe(IAggregateRoot, () => {
  let aggregate: AggregateStub

  beforeEach(
    () => (aggregate = AggregateStub.create({ foo: 'bar', is: true }).data)
  )

  it('should be a Aggregate domain object type', () => {
    expect(aggregate.domType).toEqual('AggregateRoot')
  })

  it('should have a hashcode based on its id, class name and domain object type', () => {
    const expectedHashCode = `AggregateRoot@AggregateStub|${aggregate.id.value}`
    expect(aggregate.hashcode).toEqual(expectedHashCode)
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
    const original = AggregateStub.create({ foo: 'bar', is: true }).data
    original.updateProps({ foo: 'bar2', is: false })
    original.toggle()

    const changes = [...original.changes]
    const rehydrated = AggregateStub.rehydrate<AggregateStub>(
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
    const original = AggregateStub.create({ foo: 'bar', is: true }).data
    original.updateProps({ foo: 'bar2', is: false })
    original.toggle()

    const snapshot = original.snapshot(15)

    expect(snapshot.id.equals(original.id)).toBeTruthy()
    expect(snapshot.props).toEqual(original.props)
    expect(snapshot.version).toBe(15)
    expect(snapshot.changes.length).toBe(0)
  })

  it('should be able to be rehydrated from a list of events and a snapshot', () => {
    const original = AggregateStub.create({ foo: 'bar', is: true }).data
    original.updateProps({ foo: 'bar2', is: false })
    original.toggle()

    const snapshot: AggregateStub = original.snapshot(10)
    const changes = [
      new PropsUpdatedStub({ foo: 'bar3' }, snapshot.id.value),
      new PropsUpdatedStub({ foo: 'bar4' }, snapshot.id.value),
      new AggregateToggledStub({}, snapshot.id.value),
      new AggregateToggledStub({}, snapshot.id.value),
    ]

    const rehydrated = AggregateStub.rehydrate<AggregateStub>(
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
    const original = AggregateStub.create({ foo: 'bar', is: true }).data
    original.updateProps({ foo: 'bar2', is: false })
    original.toggle()
    const clone = original.clone<AggregateStub>()

    expect(clone.equals(original)).toBeTruthy()
    expect(clone.id.equals(original.id)).toBeTruthy()
    expect(clone.props.foo).toEqual(original.props.foo)
    expect(clone.props.is).toEqual(original.props.is)
  })
})
