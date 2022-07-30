import { DataTypes, Model } from 'sequelize'

import { sequelize } from '../sequelize'

export interface PoetryModel {
  id: number
  poetryId: string
  title: string
  author: string
  paragraphs: string
  tags?: string
  dynasty: string
}

export const Poetry = sequelize.define<Model<PoetryModel>>(
  'Poetry',
  {
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
  },
  {
    timestamps: false,
  }
)
