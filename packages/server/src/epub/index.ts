import EPub from 'epub'
import fs from 'fs'
import path from 'path'

const books: Record<string, EPub> = {}

export const getBooks = async () => {
  if (Object.keys(books).length) {
    return books
  }
  await Promise.all(
    fs.readdirSync(path.join(__dirname, './books')).map((f) => {
      const book = (books[f.replace('.epub', '')] = new EPub(
        path.join(__dirname, `./books/${f}`)
      ))
      return new Promise((resolve) => {
        book.on('end', resolve)
        book.parse()
      })
    })
  )
  return books
}
