import _ from 'lodash'

import { myPoetryResolvers } from './my-poetry'
import { poetryResolvers } from './poetry'

export const resolvers = _.merge({}, poetryResolvers, myPoetryResolvers)
