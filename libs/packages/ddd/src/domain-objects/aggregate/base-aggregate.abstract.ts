import { DomainObjectType } from '../base/domain-object.type'
import { BaseEntity, IEntityProps } from '../entity/base-entity.abstract'
import { UniqueID } from '../uid/unique-id.vo'

/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
export interface IAggregateProps extends IEntityProps {}

/**
 * @class Aggregate
 * @classdesc Aggregate is a base class for all domain aggregate roots.
 * Encapsulate and are composed of entity classes and value objects that change together in a business transaction.
 * Aggregates are a transactional graph of model objects.
 * Aggregate root should be an entity, an aggregate can even be a single entity.
 * Aggregate can keep a reference to other aggregate roots,
 * but not to other entity classes which are not aggregate roots themselves.
 * Aggregate should not keep a reference to other aggregate root entity classes if those other entities
 * do not change together with this aggregate root entity.
 * Aggregate can also keep the id of another entity, but keeping too many foreign key ids is a code smell.
 * If deleting an entity has a cascade effect on the other entities referenced by class in the object graph,
 * these entities are part of the same aggregate, if not, they should not be inside this aggregate.
 *
 * @see https://martinfowler.com/bliki/EvansClassification.html
 * @see https://martinfowler.com/bliki/AggregateRoot.html
 */

export abstract class BaseAggregate<
  P extends IAggregateProps,
  I extends UniqueID = UniqueID
> extends BaseEntity<P, I> {
  public override readonly domainObjectType: DomainObjectType = 'Aggregate'

  protected constructor(props: P, id?: I) {
    super(props, id)
  }
}
