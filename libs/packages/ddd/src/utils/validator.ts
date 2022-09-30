import z from 'zod'

export const string = (value: unknown): value is string =>
  z.string().safeParse(value).success

export const isVoid = (value: unknown): value is void =>
  z.undefined().safeParse(value).success || z.null().safeParse(value).success

export const validator = {
  string,
  void: isVoid,
}
export default validator
