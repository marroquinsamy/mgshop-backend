import dotenv from 'dotenv'
import { preProcessFile } from 'typescript'
dotenv.config()

export default {
  PORT: process.env.PORT || 4000,
  DB: {
    MONGO_HOST: process.env.MONGO_HOST || 'localhost',
    MONGO_DB: process.env.MONGO_DB || 'mgshop-backend',
    MONGO_USER: process.env.MONGO_USER || '',
    MONGO_PASSWORD: process.env.MONGO_PASSWORD || '',
  },
}
