import { service } from '../database/services'

export const myPoetryResolvers = {
  Query: {
    myPoetry: (parent, args: { id: number }) => {
      return service.myPoetry.findById(args.id)
    },
    myPoetries: (
      parent,
      args: { offset: number; limit: number },
      context,
      info
    ) => {
      return service.myPoetry.findAndCountAll(args)
    },
  },
  Mutation: {
    copyByPoetryIds: (parent, args: { poetryIds }, context, info) => {
      return service.myPoetry.copyByPoetryIds(args.poetryIds)
    },
  },
}
