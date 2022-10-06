/* eslint-disable @typescript-eslint/no-explicit-any */
import { DomainObjectType } from '../base/domain-object.type'
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

export abstract class BaseAggregate<
  P extends IAggregateProps,
  I extends UniqueID = UniqueID
> extends BaseEntity<Partial<P>, I> {
  public override readonly domainObjectType: DomainObjectType = 'Aggregate'
  private _version = -1
  private _changes: IEvent[] = []

  protected constructor(props: Partial<P>, id?: I) {
    super(props, id)
  }

  /**
   * @description Aggregates are compared by their id, class and version.
   * Subclasses should override this method if they have additional properties.
   * @param other - the other aggregate to compare.
   * @returns true if the aggregate are equal in props and id.
   */
  override equals(other: BaseAggregate<P, I>): boolean {
    return super.equals(other) && this.version === other.version
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

  override clone<A extends BaseEntity<Partial<P>, I>>(): A {
    const clone = super.clone<A>()
    clone.id = this.id
    Reflect.set(clone, 'props', { ...this.props })
    return clone
  }

  snapshot<A extends BaseAggregate<P, I>>(version?: number): A {
    const snapshot = this.clone<A>()
    snapshot._version = version ?? this._version
    snapshot.commit()
    return snapshot
  }

  static rehydrate<A extends BaseAggregate<IAggregateProps>>(
    id: UniqueID,
    events: IEvent[],
    snapshot?: A
  ): A {
    const aggregate: A = snapshot || (Reflect.construct(this, [{}, id]) as A)
    events.forEach(event => {
      aggregate.apply(event)
      aggregate._version++
    })
    return aggregate
  }

  get changes(): IEvent[] {
    return this._changes
  }

  get version(): number {
    return this._version
  }
}
