/**
 * @class InvalidPropError
 * @classdesc Error thrown when a property is invalid
 * @extends Error
 * @param {string} prop - The name of the invalid property
 * @param {string} details - The details of the error
 * @example
 * throw new InvalidPropError('foo', 'bar')
 * // => Error: foo: bar
 * @example
 * try {
 *   throw new InvalidPropError('foo', 'bar')
 * } catch (e) {
 *   console.log(e instanceof InvalidPropError) // => true
 * }
 */
export class InvalidPropError extends Error {
  constructor(public readonly prop: string, public readonly details: string) {
    super(`${prop}: ${details}`)
    this.name = InvalidPropError.name
  }
}
