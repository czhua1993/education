import _ from 'lodash'

import { bookResolvers } from './book'
import { myPoetryResolvers } from './my-poetry'
import { poetryResolvers } from './poetry'

export const resolvers = _.merge(
  {},
  poetryResolvers,
  myPoetryResolvers,
  bookResolvers
)
