export const string = (value: unknown): value is string =>
  typeof value === 'string' || value instanceof String

export const isVoid = (value: unknown): value is void =>
  value === undefined || value === null

export const validator = {
  string,
  void: isVoid,
}
export default validator
