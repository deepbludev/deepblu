export const camelToSnake = (str: string) =>
  str.replace(/[A-Z]/g, (letter, index) =>
    index == 0 ? letter.toLowerCase() : '_' + letter.toLowerCase()
  )

export const isValidEmail = (email: string) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(String(email).toLowerCase())
}

const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
export const randomString = (length: number) => {
  let result = ''
  const l = characters.length
  for (let i = 0; i < length; i++) {
    result = result.concat(characters.charAt(Math.floor(Math.random() * l)))
  }
  return result
}

export const textUtils = {
  camelToSnake,
  isValidEmail,
  randomString,
}

export default textUtils
