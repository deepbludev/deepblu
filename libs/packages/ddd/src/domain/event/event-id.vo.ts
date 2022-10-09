import { UniqueIDProps } from '../uid/unique-id.vo'
import { UUID } from '../uid/uuid.vo'

export class EventID extends UUID {
  protected constructor(props: UniqueIDProps) {
    super(props)
  }
}
