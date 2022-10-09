export const DomainObjects = {
  DomainObject: 'DomainObject',
  Entity: 'Entity',
  ValueObject: 'ValueObject',
  AggregateRoot: 'AggregateRoot',
} as const

export type DomainObjectType = typeof DomainObjects[keyof typeof DomainObjects]
