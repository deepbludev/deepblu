import { uuid } from '../utils/id.utils'
import { uid } from '../decorators/uid.decorator'
import { UniqueID, UniqueIDProps } from './unique-id.vo'

@uid({ generator: uuid.create, validator: uuid.isValid })
export class UUID extends UniqueID {
  constructor(props: UniqueIDProps) {
    super(props)
  }
}
