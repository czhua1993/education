import { DataTypes, Model } from 'sequelize'

import { sequelize } from '../sequelize'

import type { PoetryModel } from './poetry'

export interface MyPoetryModel extends PoetryModel {
  /** 排序索引 */
  index?: number
}

export const MyPoetry = sequelize.define<Model<MyPoetryModel>>('MyPoetry', {
  id: {
    type: DataTypes.NUMBER,
    primaryKey: true,
  },
  poetryId: DataTypes.STRING,
  title: DataTypes.STRING,
  author: DataTypes.STRING,
  paragraphs: DataTypes.TEXT,
  tags: DataTypes.TEXT,
  dynasty: DataTypes.STRING,
  index: DataTypes.REAL,
})
