import { Op } from 'sequelize'

import { MyPoetry, MyPoetryModel } from '../model/my-poetry'
import { Poetry } from '../model/poetry'

export const myPoetryService = {
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
    return MyPoetry.findAndCountAll({
      offset,
      limit,
      where,
      order: [['index', 'ASC']],
    })
  },

  findById: async (id: number) => {
    const list = await MyPoetry.findAll({
      where: {
        id,
      },
    })
    return list[0]
  },

  copyByPoetryIds: async (poetryIds: string) => {
    const where = { poetryId: poetryIds }
    const poetries = await Poetry.findAll({ where })
    const myPoetryIds = (await MyPoetry.findAll({ where })).map(
      (item: any) => item.dataValues.poetryId
    )
    const myPoetryCount = await MyPoetry.count()
    return await MyPoetry.bulkCreate(
      poetries
        .filter((item: any) => !myPoetryIds.includes(item.dataValues.poetryId))
        .map((item: any, index) => ({
          ...item.dataValues,
          id: undefined,
          index: myPoetryCount + index + 1,
        }))
    )
  },

  updateByPoetryIds: async (
    params: Partial<MyPoetryModel>,
    poetryIds: string[]
  ) => {
    return MyPoetry.update(params, {
      where: { poetryId: poetryIds },
    })
  },

  updateByPoetryId: async (
    params: Partial<MyPoetryModel>,
    poetryId: string
  ) => {
    const where = { poetryId }
    return MyPoetry.update(params, {
      where,
    })
  },

  delete: async (ids: string[]) => {
    const where = { id: ids }
    await MyPoetry.destroy({
      where,
    })
  },

  add: async (poetry: MyPoetryModel) => {
    const myPoetryCount = await MyPoetry.count()
    const res = await MyPoetry.create({
      ...poetry,
      index: poetry.index ? poetry.index : myPoetryCount + 1,
    })
    return res
  },
}
