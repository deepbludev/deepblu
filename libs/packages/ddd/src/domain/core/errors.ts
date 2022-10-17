import { ICommand } from '../command/command.abstract'
import { IQuery } from '../query/query.abstract'

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

  static with(prop: string, details: string) {
    return new InvalidPropError(prop, details)
  }
}

export class CommandNotRegisteredError extends Error {
  constructor(public readonly command: ICommand) {
    super(`Command ${command.constructor.name} not registered`)
    this.name = CommandNotRegisteredError.name
  }

  static with(command: ICommand) {
    return new CommandNotRegisteredError(command)
  }
}

export class QueryNotRegisteredError extends Error {
  constructor(public readonly query: IQuery) {
    super(`Query ${query.constructor.name} not registered`)
    this.name = QueryNotRegisteredError.name
  }

  static with(query: IQuery) {
    return new QueryNotRegisteredError(query)
  }
}
