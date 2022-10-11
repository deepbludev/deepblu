/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IProps {
  [index: string]: any
}

export interface IDomainObject<P extends IProps = IProps> {
  props: P
}

export type Props<O extends IDomainObject> = O['props']

export const DomainObjects = {
  DOMAIN_OBJECT: 'DomainObject',
  ENTITY: 'Entity',
  VALUE_OBJECT: 'ValueObject',
  AGGREGATE_ROOT: 'AggregateRoot',
} as const

export type DomainObjectType = typeof DomainObjects[keyof typeof DomainObjects]
