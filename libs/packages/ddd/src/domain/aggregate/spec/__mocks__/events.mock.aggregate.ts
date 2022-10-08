import { DomainEvent } from '../../../event/domain-event'
import { domainEvent } from '../../../event/utils/domain-event.decorator'
import { createDomainEvent } from '../../../event/utils/create-domain-event-as-from.util'
import { IMessage, Payload } from '../../../types'

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

/**
 * @event MockPropsUpdated
 * @description Event fired after updating the props of a MockAggregate.
 */
@domainEvent('MockAggregate')
export class MockPropsUpdated extends DomainEvent {
  constructor(
    payload: Partial<Payload<typeof MockAggregateCreated>>,
    id: string
  ) {
    super(payload, id)
  }
}
export type MockPropsUpdatedPayload = Payload<typeof MockPropsUpdated>

/**
 * @event MockToggled
 * @description Event fired after toggling the 'is' property of a MockAggregate.
 */

export const MockToggled = createDomainEvent()
  .as('MockToggled')
  .from('MockAggregate')
