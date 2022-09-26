import { uuid } from '../utils/id.utils'
import { id, UniqueID, UniqueIDProps } from './unique-id.vo'

@id({
  generator: uuid.create,
  validator: uuid.isValid,
})
export class UUID extends UniqueID {
  constructor(props: UniqueIDProps) {
    super(props)
  }
}
