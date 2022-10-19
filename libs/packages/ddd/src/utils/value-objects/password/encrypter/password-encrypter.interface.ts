export interface PasswordEncrypter {
  encrypt: (password: string) => string
  compare: (password: string, encrypted: string) => boolean
}
