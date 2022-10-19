import { StringValidator } from '../custom-string/custom-string.vo'
import { Email } from './email.vo'

const customEmail = ({
  whitelist,
  blacklist,
}: {
  whitelist?: string[]
  blacklist?: string[]
}) =>
  function <T extends { validate: StringValidator }>(EmailClass: T) {
    EmailClass.validate = (value: string) => {
      const { data: email, isFail } = Email.create(value)
      if (isFail) return false
      if (whitelist?.includes(email.domain)) return true
      if (blacklist?.includes(email.domain)) return false
      return !whitelist?.length
    }
    return EmailClass
  }

/**
 * Sets the domain whitelist for the given Email class
 * @decorator
 *
 * @example
 * @whitelist('gmail.com', 'outlook.com')
 * class WhitelistedEmail extends Email {}
 */
export const whitelist = (...domains: string[]) =>
  customEmail({ whitelist: domains })

/**
 * Sets the domain blacklist for the given Email class
 * @decorator
 *
 * @example
 * @blacklist('gmail.com', 'outlook.com')
 * class BlacklistedEmail extends Email {}
 */
export const blacklist = (...domains: string[]) =>
  customEmail({ blacklist: domains })
