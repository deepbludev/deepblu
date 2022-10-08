/* eslint-disable @typescript-eslint/no-explicit-any */
import { DomainObjects, DomainObjectType } from '../core/domain-object.type'
import { BaseEntity, IEntityProps } from '../entity/base-entity.abstract'
import { IEvent } from '../event/event.interface'
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

export abstract class BaseAggregateRoot<
  P extends IAggregateProps,
  I extends UniqueID = UniqueID
> extends BaseEntity<P, I> {
  public override readonly domainObjectType: DomainObjectType =
    DomainObjects.AggregateRoot
  private _version = -1
  private _changes: IEvent[] = []

  protected constructor(props: P, id?: I) {
    super(props, id)
  }

  protected applyChange(event: IEvent): void {
    this.apply(event, true)
  }

  private apply(event: IEvent, isNew = false): void {
    const self = this as any
    self[`_on${event.name}`](event)
    if (isNew) this._changes.push(event)
  }

  commit(): IEvent[] {
    const commited: IEvent[] = [...this._changes]
    this._changes = []
    return commited
  }

  snapshot<A extends BaseAggregateRoot<P, I>>(version?: number): A {
    const snapshot = this.clone<A>()
    snapshot._version = version ?? this._version
    snapshot.commit()
    return snapshot
  }

  static rehydrate<A extends BaseAggregateRoot<IAggregateProps>>(
    id: UniqueID,
    events: IEvent[],
    snapshot?: A
  ): A {
    const aggregate: A = snapshot || (Reflect.construct(this, [{}, id]) as A)
    events.forEach(event => {
      aggregate.apply(event)
      aggregate._version++
    })
    aggregate.commit()
    return aggregate
  }

  get hasChanges(): boolean {
    return this._changes.length > 0
  }

  get changes(): IEvent[] {
    return this._changes
  }

  get version(): number {
    return this._version
  }
}
