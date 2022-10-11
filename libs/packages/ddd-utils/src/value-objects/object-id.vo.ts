import { customAlphabet } from 'nanoid'
import { customUID, UniqueIDProps, IUniqueID } from '@deepblu/ddd'

export const generateObjectID = customAlphabet('1234567890abcdef', 24)
export const validateObjectID = (id: string) => /^[0-9a-f]{24}$/.test(id)

@customUID({
  generator: generateObjectID,
  validator: validateObjectID,
})
export class ObjectID extends IUniqueID {
  constructor(props: UniqueIDProps) {
    super({ value: props.value.toLowerCase() })
  }
}
