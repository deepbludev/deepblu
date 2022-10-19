export interface PasswordEncrypter {
  encrypt: (password: string) => Promise<string>
  compare: (password: string, encrypted: string) => Promise<boolean>
}
