import { textUtils } from '../../text.utils'
import { StringValidator } from '../custom-string/custom-string.vo'

export type Filterlist = { WHITELIST: string[]; BLACKLIST: string[] }
const empty: Filterlist = { WHITELIST: [], BLACKLIST: [] }

/**
 * Sets the whitelist and blacklist for the given Email class
 * @decorator
 *
 * @example
 * @customEmail({
 *   blacklist: ['mailinator.com', 'guerrillamail.com'],
 * })
 * class BlacklistedEmail extends Email {}
 *
 * @example
 * @customEmail({
 *   whitelist: ['gmail.com', 'hotmail.com', 'yahoo.com'],
 * })
 * class WhitelistedEmail extends Email {}
 *
 */
const customEmail = (opts: { whitelist?: string[]; blacklist?: string[] }) =>
  function <
    T extends {
      validate: StringValidator
      WHITELIST: string[]
      BLACKLIST: string[]
    }
  >(EmailClass: T) {
    EmailClass.WHITELIST = [...(opts.whitelist ?? empty.WHITELIST)]
    EmailClass.BLACKLIST = [...(opts.blacklist ?? empty.BLACKLIST)]

    EmailClass.validate = (email: string) => {
      if (!textUtils.isValidEmail(email)) return false

      const domain = email.split('@')[1]
      const { WHITELIST, BLACKLIST } = EmailClass

      if (WHITELIST.includes(domain)) return true
      if (BLACKLIST.includes(domain)) return false
      return !WHITELIST.length
    }
    return EmailClass
  }

/**
 * Sets the whitelist for the given Email class
 * @decorator
 *
 * @example
 * @whitelist('gmail.com', 'outlook.com')
 * class WhitelistedEmail extends Email {}
 */
export const whitelist = (...domains: string[]) =>
  customEmail({ whitelist: domains })

/**
 * Sets the blacklist for the given Email class
 * @decorator
 *
 * @example
 * @blacklist('gmail.com', 'outlook.com')
 * class BlacklistedEmail extends Email {}
 */
export const blacklist = (...domains: string[]) =>
  customEmail({ blacklist: domains })
