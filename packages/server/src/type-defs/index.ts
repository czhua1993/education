import { gql } from 'apollo-server-core'

import { myPoetry } from './my-poetry'
import { poetry } from './poetry'

export const typeDefs = [
  gql`
    type Query
    type Mutation
  `,
  poetry,
  myPoetry,
]
