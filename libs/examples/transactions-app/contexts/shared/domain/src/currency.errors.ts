export class InvalidCurrencyError extends Error {
  constructor(currency: string) {
    super(`${currency} is not a valid currency (e.g USD, EUR, GBP, JPY)`)
    this.name = 'InvalidCurrencyError'
  }

  static with(currency: string): InvalidCurrencyError {
    return new InvalidCurrencyError(`Currency '${currency}' is not valid`)
  }
}
