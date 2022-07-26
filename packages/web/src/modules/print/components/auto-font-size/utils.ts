import _ from 'lodash'

export const getLines = (text: string) => {
  const length = text.length
  if (length >= 12) {
    return _.chunk(text, Math.ceil(length / 3)).map((s) => s.join(''))
  } else if (length > 5) {
    return _.chunk(text, Math.ceil(length / 2)).map((s) => s.join(''))
  }
  return [text]
}
