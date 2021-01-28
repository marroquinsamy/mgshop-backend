import dotenv from 'dotenv'
dotenv.config()

export default {
  PORT: process.env.PORT || 4000,
  jwtSecret: process.env.JWT_SECRET || 'secrettoken',
  DB: {
    MONGO_HOST: process.env.MONGO_HOST || 'localhost',
    MONGO_DB: process.env.MONGO_DB || 'mgshop-backend',
    MONGO_USER: process.env.MONGO_USER || '',
    MONGO_PASSWORD: process.env.MONGO_PASSWORD || '',
  },
}
