import { ApolloServerPluginDrainHttpServer, gql } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import http from 'http'

import { sequelize } from './database/sequelize'
import { resolvers } from './resolvers'
import { typeDefs } from './type-defs'

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

startApolloServer(typeDefs, resolvers)
