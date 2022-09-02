import { gql } from 'apollo-server-core'

export const book = gql`
  type Chapter {
    id: ID
    title: String
    text: String
  }

  type Book {
    title: String
    chapterList: [Chapter]
  }

  extend type Query {
    chapter(code: String, id: String): Chapter
    book(code: String): Book
    chapterList(code: String, ids: [String]): [Chapter]
  }
`
