import * as uuidv4 from 'uuid'
import v from './validator'

export const uuid = {
  create: uuidv4.v4,
  isValid: uuidv4.validate,
}

export const uid = {
  create: uuid.create,
  isValid: (id: string) => v.string(id) && id.length > 0,
}

export const idUtils = {
  uuid,
  uid,
}

export default idUtils
