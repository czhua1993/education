import { Op } from 'sequelize'

import { MyPoetry } from '../model/my-poetry'
import { Poetry, PoetryModel } from '../model/poetry'

export const poetryService = {
  findAndCountAll: async (
    params: {
      offset: number
      limit: number
    },
    search: Record<string, string> = {}
  ) => {
    const { offset, limit } = params

    const where: Record<string, any> = {}

    Object.keys(search).forEach((key) => {
      if (search[key]) {
        where[key] = {
          [Op.like]: search[key],
        }
      }
    })

    return Poetry.findAndCountAll({
      offset,
      limit,
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

  /**
   * 复制到 MyPoetry
   */
  copyByPoetryIds: async (poetryIds: string[]) => {
    const where = { poetryId: poetryIds }
    const poetries = await Poetry.findAll({ where })
    const myPoetryIds = (await MyPoetry.findAll({ where })).map(
      (item: any) => item.dataValues.poetryId
    )
    const myPoetryCount = await MyPoetry.count()
    await MyPoetry.bulkCreate(
      poetries
        .filter((item: any) => !myPoetryIds.includes(item.dataValues.poetryId))
        .map((item: any, index) => ({
          ...item.dataValues,
          id: undefined,
          index: myPoetryCount + index + 1,
        }))
    )
    return { msg: '' }
  },

  updateByPoetryId: async (params: Partial<PoetryModel>, poetryId: string) => {
    const where = { poetryId }
    return Poetry.update(params, {
      where,
    })
  },
}
