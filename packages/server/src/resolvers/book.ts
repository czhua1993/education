import { getBooks } from '../epub'

export const bookResolvers = {
  Query: {
    books: async () => {
      const books = await getBooks()
      return Object.entries(books).map(([name, book]) => ({
        name,
        chapterList: book.flow.map((c) => ({
          id: c.id,
          title: c.title,
          text: '',
        })),
      }))
    },
    book: async (parent, args: { name: string }) => {
      const books = await getBooks()
      const book = books[args.name]
      return {
        name: args.name,
        chapterList: book.flow.map((c) => ({
          id: c.id,
          title: c.title,
          text: '',
        })),
      }
    },
    chapter: async (parent, args: { book: string; id: string }) => {
      const books = await getBooks()
      const epub = books[args.book]
      const chapterList = epub.flow.map((c) => ({
        id: c.id,
        title: c.title,
        text: '',
      }))
      const chapter = await new Promise((resolve) => {
        epub.getChapter(args.id, (error, text) => {
          resolve({
            id: args.id,
            title: chapterList.find((c) => c.id === args.id)?.title,
            text,
          })
        })
      })
      return chapter
    },
    chapterList: async (parent, args: { book: string; ids: string[] }) => {
      const books = await getBooks()
      const epub = books[args.book]
      const list = epub.flow.map((c) => ({
        id: c.id,
        title: c.title,
        text: '',
      }))
      const chapterList = await Promise.all(
        args.ids.map(
          (id) =>
            new Promise((resolve) => {
              epub.getChapter(id, (error, text) => {
                resolve({
                  id,
                  title: list.find((c) => c.id === id)?.title,
                  text,
                })
              })
            })
        )
      )
      return chapterList
    },
  },
}
