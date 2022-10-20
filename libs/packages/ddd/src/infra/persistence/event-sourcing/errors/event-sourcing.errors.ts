import { IAggregateRoot } from '../../../../domain'

export class EventSourcingError extends Error {
  constructor(message: string) {
    super(message)
    this.name = EventSourcingError.name
  }
}

export class ConcurrencyError extends EventSourcingError {
  constructor(aggregate: IAggregateRoot, version: number) {
    const message =
      `${aggregate.hashcode} has version ${aggregate.version} ` +
      `but the eventstore has version ${version}`
    super(message)
    this.name = ConcurrencyError.name
  }

  static with(aggregate: IAggregateRoot, version: number): ConcurrencyError {
    return new ConcurrencyError(aggregate, version)
  }
}
