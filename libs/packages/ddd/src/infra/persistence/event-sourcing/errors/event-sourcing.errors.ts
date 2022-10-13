import { IAggregateRoot } from '../../../../domain'

export class EventSourcingError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'EventSourcingError'
  }
}

export class ConcurrencyError extends EventSourcingError {
  constructor(aggregate: IAggregateRoot, version: number) {
    const message =
      `${aggregate.hashcode} has version ${aggregate.version} ` +
      `but the eventstore has version ${version}`
    super(message)
    this.name = 'ConcurrencyError'
  }
}