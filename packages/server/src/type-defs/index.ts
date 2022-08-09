import { gql } from 'apollo-server-core'

import { book } from './book'
import { myPoetry } from './my-poetry'
import { poetry } from './poetry'

export const typeDefs = [
  gql`
    type Query
    type Mutation
  `,
  poetry,
  myPoetry,
  book,
]
