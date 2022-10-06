import { unique } from '../../entity/unique.decorator'
import { UniqueID } from '../../uid/unique-id.vo'
import { UUID } from '../../uid/uuid.vo'
import { BaseAggregate, IAggregateProps } from '../base-aggregate.abstract'

interface Props extends IAggregateProps {
  foo: string
  is: boolean
}

@unique(UUID)
class TestAggregate extends BaseAggregate<Props, UUID> {
  constructor(props: Props, id?: UUID) {
    super(props, id)
  }
}

describe('AggregateBase', () => {
  it('should be defined', () => {
    expect(BaseAggregate).toBeDefined()
  })

  const aggregate = new TestAggregate({ foo: 'bar', is: true })

  it('should be a Aggregate domain object type', () => {
    expect(aggregate.domainObjectType).toEqual('Aggregate')
  })

  it('should have a hashcode based on its id, class name and domain object type', () => {
    const expectedHashCode = UniqueID.from(
      `[Aggregate@TestAggregate]:${aggregate.id.value}`
    ).data
    expect(aggregate.hashcode.equals(expectedHashCode)).toBeTruthy()
  })
})
