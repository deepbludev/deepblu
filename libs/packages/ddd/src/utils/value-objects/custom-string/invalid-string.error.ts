export class InvalidStringError extends Error {
  static with(message: string): InvalidStringError {
    return new InvalidStringError(message)
  }
}
