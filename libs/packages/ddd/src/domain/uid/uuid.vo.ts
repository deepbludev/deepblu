import { uuid } from '../../utils/id.utils'
import { customUID } from './utils/custom-uid.decorator'
import { UniqueID, UniqueIDProps } from './unique-id.vo'

@customUID({ generator: uuid.create, validator: uuid.isValid })
export class UUID extends UniqueID {
  constructor(props: UniqueIDProps) {
    super(props)
  }
}
