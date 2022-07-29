import _ from 'lodash'

const getAvgList = (list: string[], maxLength = 10): string[] => {
  const res = []
  let start = list[0]
  for (let i = 1; i < list.length; i++) {
    if (start.length > maxLength) {
      res.push(start)
      start = list[i]
    } else if (list[i].length > maxLength) {
      res.push(start, list[i])
      start = ''
    } else if (start.length + list[i].length > maxLength) {
      res.push(start)
      start = list[i]
    } else {
      start = start + ' ' + list[i]
    }
  }
  if (start) {
    res.push(start)
  }
  if (res.length > 3) {
    return getAvgList(res, maxLength + 2)
  }
  return res
}

export const getLines = (text: string, isEnglish = false) => {
  if (isEnglish) {
    const list = text.trim().split(' ')
    return getAvgList(list)
  }
  const length = text.length
  if (length >= 12) {
    return _.chunk(text, Math.ceil(length / 3)).map((s) => s.join(''))
  } else if (length > 5) {
    return _.chunk(text, Math.ceil(length / 2)).map((s) => s.join(''))
  }
  return [text]
}
