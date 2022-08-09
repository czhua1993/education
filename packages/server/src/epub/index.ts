import EPub from 'epub'
import path from 'path'

export const shukeBeita = new EPub(
  path.join(__dirname, './books/shuke-beita.epub')
)

export const fileThousandYears = new EPub(
  path.join(__dirname, './books/five-thousand-years.epub')
)
