import { Op } from 'sequelize';

import { MyPoetry, MyPoetryModel } from '../model/my-poetry';

export const myPoetryService = {
  findAndCountAll: async (
    params: {
      current: number;
      pageSize: number;
    },
    search: Record<string, string> = {}
  ) => {
    const { current, pageSize } = params;

    const where: Record<string, any> = {};

    Object.keys(search).forEach((key) => {
      if (search[key]) {
        where[key] = {
          [Op.like]: search[key],
        };
      }
    });

    return MyPoetry.findAndCountAll({
      offset: (current - 1) * pageSize,
      limit: pageSize,
      where,
      order: [['index', 'ASC']],
    });
  },

  updateByPoetryIds: async (
    params: Partial<MyPoetryModel>,
    poetryIds: string[]
  ) => {
    return MyPoetry.update(params, {
      where: { poetryId: poetryIds },
    });
  },

  updateByPoetryId: async (
    params: Partial<MyPoetryModel>,
    poetryId: string
  ) => {
    const where = { poetryId };
    return MyPoetry.update(params, {
      where,
    });
  },

  delete: async (ids: string[]) => {
    const where = { id: ids };
    await MyPoetry.destroy({
      where,
    });
  },

  add: async (poetry: MyPoetryModel) => {
    const myPoetryCount = await MyPoetry.count();
    const res = await MyPoetry.create({
      ...poetry,
      index: poetry.index ? poetry.index : myPoetryCount + 1,
    });
    return res;
  },
};
