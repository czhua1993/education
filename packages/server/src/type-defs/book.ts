import { gql } from 'apollo-server-core'

export const book = gql`
  type Chapter {
    id: ID
    title: String
    text: String
  }

  type Book {
    name: String
    chapterList: [Chapter]
  }

  extend type Query {
    books: [Book]
    book(name: String): Book
    chapter(book: String, id: String): Chapter
    chapterList(book: String, ids: [String]): [Chapter]
  }
`
