import { service } from '../database/services'

export const poetryResolvers = {
  Query: {
    poetry: (parent, args: { id: number }) => {
      return service.poetry.findById(args.id)
    },
    poetries: (parent, args, context, info) => {
      return service.poetry.findAndCountAll(args)
    },
  },
}
