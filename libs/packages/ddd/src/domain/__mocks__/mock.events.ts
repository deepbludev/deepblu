import { DomainEventAs } from '../event/domain-event'
import { createDomainEvent } from '../event/utils/create-domain-event-as-from.util'
import { Payload } from '../types'

/**
 * @event MockAggregateCreated
 * @description Event fired after a new MockAggregate is created.
 */
export const MockAggregateCreated = createDomainEvent<{
  foo: string
  is?: boolean
}>()
  .as('MockAggregateCreated')
  .from('MockAggregate')
export type MockAggregateCreatedType = DomainEventAs<
  typeof MockAggregateCreated
>

/**
 * @event MockPropsUpdated
 * @description Event fired after updating the props of a MockAggregate.
 */
export const MockPropsUpdated = createDomainEvent<
  Partial<Payload<typeof MockAggregateCreated>>
>()
  .as('MockPropsUpdated')
  .from('MockAggregate')

/**
 * @event MockToggled
 * @description Event fired after toggling the 'is' property of a MockAggregate.
 */

export const MockAggregateToggled = createDomainEvent()
  .as('MockAggregateToggled')
  .from('MockAggregate')
export type MockAggregateToggledType = DomainEventAs<
  typeof MockAggregateToggled
>
