export class InvalidNumberError extends Error {
  static with(message: string): InvalidNumberError {
    return new InvalidNumberError(message)
  }
}
