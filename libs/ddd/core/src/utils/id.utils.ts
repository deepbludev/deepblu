import * as uuidv4 from 'uuid'
import { nanoid } from 'nanoid'

export const uuid = {
  create: uuidv4.v4,
  isValid: uuidv4.validate,
}

export const uid = nanoid

export const idUtils = {
  uuid,
  uid,
}

export default idUtils
