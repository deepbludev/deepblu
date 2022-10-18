import { textUtils } from '../../text.utils'
import { StringValidator } from '../custom-string/custom-string.vo'

export type Filterlist = { WHITELIST: string[]; BLACKLIST: string[] }
const empty: Filterlist = { WHITELIST: [], BLACKLIST: [] }

/**
 * Custom string decorator
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
export const customEmail = (opts: {
  whitelist?: string[]
  blacklist?: string[]
}) =>
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
      if (WHITELIST.length > 0) return false

      return true
    }
    return EmailClass
  }
