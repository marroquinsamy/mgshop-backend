import dotenv from 'dotenv'
dotenv.config()

export default {
  PORT: process.env.PORT || 4000,
  DB: {
    MONGO_HOST: process.env.MONGO_HOST || 'localhost',
    MONGO_DB: process.env.MONGO_DB || 'mgshop-backend',
  },
}
