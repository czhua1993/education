import { gql } from 'apollo-server-core'

export const myPoetry = gql`
  type MyPoetry {
    id: ID
    poetryId: String
    title: String
    author: String
    paragraphs: String
    tags: String
    dynasty: String
  }

  type MyPoetries {
    count: Int
    rows: [MyPoetry]
  }

  extend type Query {
    myPoetry(id: Int): MyPoetry
    myPoetries(offset: Int = 0, limit: Int = 10): MyPoetries
  }

  extend type Mutation {
    copyByPoetryIds(poetryIds: [String]): [MyPoetry]
  }
`
