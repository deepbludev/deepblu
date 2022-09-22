import * as uuidv4 from 'uuid'

export const uuid = {
  create: (): string => uuidv4.v4(),
  isValid: (value: unknown): value is string => {
    return typeof value === 'string' && uuidv4.validate(value)
  },
}

export default uuid
