import { ApolloServerPluginDrainHttpServer, gql } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import http from 'http'

import { sequelize } from './database/sequelize'
import { service } from './database/services'

async function startApolloServer(typeDefs: any, resolvers: any) {
  sequelize.sync() // 初始化数据库
  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })
  await server.start()
  server.applyMiddleware({ app })
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  )
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type Poetry {
    id: ID
    poetryId: String
    title: String
    author: String
    paragraphs: String
    tags: String
    dynasty: String
  }

  type PoetryList {
    count: Int
    rows: [Poetry]
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    poetries(offset: Int = 0, limit: Int = 10): PoetryList
    poetry(id: Int): Poetry
  }
`

const resolvers = {
  Query: {
    poetry: (parent, args: { id: number }) => {
      return service.poetry.findById(args.id)
    },
    poetries: (
      parent,
      args: { offset: number; limit: number },
      context,
      info
    ) => {
      return service.poetry.findAndCountAll(args)
    },
  },
}

startApolloServer(typeDefs, resolvers)
