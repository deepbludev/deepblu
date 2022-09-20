import z from 'zod'

export const string = (value: unknown): value is string => {
  return z.string().safeParse(value).success
}

export const validator = {
  string,
}
export default validator
