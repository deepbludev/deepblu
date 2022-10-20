export class InvalidEmailError extends Error {
  static with(email: string): InvalidEmailError {
    return new InvalidEmailError(`${email} is not a valid email`)
  }
}
