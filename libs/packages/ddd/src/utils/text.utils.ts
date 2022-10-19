import { nanoid } from 'nanoid'

export const camelToSnake = (str: string) =>
  str.replace(/[A-Z]/g, (letter, index) =>
    index == 0 ? letter.toLowerCase() : '_' + letter.toLowerCase()
  )

export const isValidEmail = (email: string) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(String(email).toLowerCase())
}

export const randomString = (length: number) => nanoid(length)

export const textUtils = {
  camelToSnake,
  isValidEmail,
  randomString,
}

export default textUtils
