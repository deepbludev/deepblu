export interface IProviderC {
  bar(): string
}

export const Token = { IProviderC: Symbol('IProviderC') }
