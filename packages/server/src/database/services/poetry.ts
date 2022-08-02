import { Op } from 'sequelize'

import { Poetry } from '../model/poetry'

export const poetryService = {
  findAndCountAll: async (params: {
    offset: number
    limit: number
    search: Record<string, string>
  }) => {
    const { offset, limit, search = {} } = params
    const where: Record<string, any> = {}
    Object.keys(search).forEach((key) => {
      if (search[key]) {
        where[key] = {
          [Op.like]: search[key],
        }
      }
    })
    return Poetry.findAndCountAll({
      offset: offset ?? 0,
      limit: limit ?? 10,
      where,
    })
  },

  findById: async (id: number) => {
    const list = await Poetry.findAll({
      where: {
        id,
      },
    })
    return list[0]
  },
}
