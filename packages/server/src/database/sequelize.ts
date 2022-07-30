import path from 'path'
import { Sequelize } from 'sequelize'

const storage = path.join(__dirname, './sqlite.db')

console.log('storage: ', storage)

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage,
  logging: true,
})
