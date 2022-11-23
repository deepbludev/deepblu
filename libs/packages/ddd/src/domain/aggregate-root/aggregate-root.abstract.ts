/* eslint-disable @typescript-eslint/no-explicit-any */
import { IEntity, IEntityProps } from '../entity/entity.abstract'
import { IDomainEvent } from '../event/domain-event.interface'
import { DomainObjects, DomainObjectType } from '../types/domain-object.types'
import { IUniqueID } from '../uid/unique-id.vo'

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

export abstract class IAggregateRoot<
  I extends IUniqueID = IUniqueID,
  P extends IAggregateProps = IAggregateProps
> extends IEntity<I, P> {
  public override readonly domType: DomainObjectType =
    DomainObjects.AGGREGATE_ROOT
  private _version = -1
  private _changes: IDomainEvent[] = []

  protected constructor(props: P, id?: I) {
    super(props, id)
  }

  apply(event: IDomainEvent, isFromHistory = false): void {
    const self = this as any
    const handler = `on${event.name}`
    self[handler] && self[handler](event)
    if (!isFromHistory) this._changes.push(event)
  }

  commit(): IDomainEvent[] {
    const commited: IDomainEvent[] = [...this._changes]
    this._changes = []
    return commited
  }

  snapshot<A extends IAggregateRoot<I, P>>(version?: number): A {
    const snapshot = this.clone<A>()
    snapshot._version = version ?? this._version
    snapshot.commit()
    return snapshot
  }

  static rehydrate<A extends IAggregateRoot>(
    id: IUniqueID,
    events: IDomainEvent[],
    snapshot?: A
  ): A {
    const aggregate: A = snapshot || (Reflect.construct(this, [{}, id]) as A)
    events.forEach(event => {
      aggregate.apply(event, true)
      aggregate._version++
    })
    aggregate.commit()
    return aggregate
  }

  get hasChanges(): boolean {
    return this._changes.length > 0
  }

  get changes(): IDomainEvent[] {
    return this._changes
  }

  get version(): number {
    return this._version
  }
}
