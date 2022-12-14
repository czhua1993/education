import { gql } from 'apollo-server-core'

export const poetry = gql`
  type Poetry {
    id: ID
    poetryId: String
    title: String
    author: String
    paragraphs: String
    tags: String
    dynasty: String
  }

  type Poetries {
    count: Int
    rows: [Poetry]
  }

  input PoetriesSearch {
    poetryId: String
    title: String
    author: String
    paragraphs: String
    tags: String
    dynasty: String
  }

  extend type Query {
    poetry(id: Int): Poetry
    poetries(offset: Int = 0, limit: Int = 10, search: PoetriesSearch): Poetries
  }
`
