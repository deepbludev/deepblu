import { IUniqueID } from './types/unique-id.interface'
import { ValueObject, VOProps } from './value-object'

export interface UniqueIDProps extends VOProps {
  value: string
  isNew: boolean
}

export abstract class UniqueID
  extends ValueObject<UniqueIDProps>
  implements IUniqueID
{
  protected constructor(props: UniqueIDProps) {
    super(props)
  }

  equal(id: IUniqueID): boolean {
    return typeof this.value === typeof id.value && this.value === id.value
  }

  override clone<UniqueID>(): UniqueID {
    return super.clone() as UniqueID
  }

  cloneAsNew<UniqueID>(): UniqueID {
    const constructor = Reflect.getPrototypeOf(this)?.constructor || UniqueID
    const clone = Reflect.construct(constructor, [
      {
        value: this.value,
        isNew: true,
      },
    ])
    return clone
  }

  get value(): string {
    return this.props.value
  }

  get isNew(): boolean {
    return this.props.isNew
  }
}
