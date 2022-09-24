import * as uuidv4 from 'uuid'

export const uuid = {
  create: uuidv4.v4,
  isValid: uuidv4.validate,
}

export const defaultID = (): string => {
  const random8 = () => Math.random().toString(36).substring(2, 10)
  const timestamp = () => Date.now().toString(36)
  return timestamp() + random8() + random8()
}

export const idUtils = {
  uuid,
  defaultID,
}

export default idUtils
