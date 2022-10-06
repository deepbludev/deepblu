import { UniqueID } from '../../uid/unique-id.vo'
import { MockAggregate } from './__mocks__/mock.aggregate'

describe('AggregateBase', () => {
  const aggregate = MockAggregate.create({ foo: 'bar', is: true }).data

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
    aggregate.updateProps({ foo: 'bar2', is: false })
    expect(aggregate.changes.length).toEqual(2)
    expect(aggregate.props).toEqual({ foo: 'bar2', is: false })
    aggregate.updateProps({ is: true })
    expect(aggregate.changes.length).toEqual(3)
    expect(aggregate.props).toEqual({ foo: 'bar2', is: true })
  })

  it('should have no uncommited events after changes are commited', () => {
    const changes = aggregate.changes
    expect(aggregate.commit()).toEqual(changes)
    expect(aggregate.changes.length).toEqual(0)
  })

  it('should be able to be rehydrated from a list of events', () => {
    const original = MockAggregate.create({ foo: 'bar', is: true }).data
    original.updateProps({ foo: 'bar2', is: false })
    original.updateProps({ is: true })
    const changes = original.changes
    const rehydrated = MockAggregate.rehydrate<MockAggregate>(
      original.id,
      changes
    )
    expect(rehydrated.equals(original)).toBeTruthy()
    expect(rehydrated.changes.length).toEqual(0)
    expect(original.changes.length).toEqual(3)
  })
})
