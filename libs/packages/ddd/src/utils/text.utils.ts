export const camelToSnake = (str: string) =>
  str.replace(/[A-Z]/g, (letter, index) =>
    index == 0 ? letter.toLowerCase() : '_' + letter.toLowerCase()
  )

export const textUtils = {
  camelToSnake,
}

export default textUtils
